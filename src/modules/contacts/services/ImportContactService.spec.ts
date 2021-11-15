import mongoose from 'mongoose';
import { Readable } from 'stream';

import Contact from '../infra/mongoose/schemas/Contact';
import Tag from '../infra/mongoose/schemas/Tag';
import ContactsRepositoryInMemory from '../repositories/in-memory/ContactsRepositoryInMemory';
import TagsRepositoryInMemory from '../repositories/in-memory/TagsRepsositoryInMemory';
import ImportContactsService from './ImportContactsService';

let contactsRepositoryInMemory: ContactsRepositoryInMemory;
let tagsRepositoryInMemory: TagsRepositoryInMemory;
let importContacts: ImportContactsService;

describe('Import', () => {
  beforeEach(async () => {
    contactsRepositoryInMemory = new ContactsRepositoryInMemory();
    tagsRepositoryInMemory = new TagsRepositoryInMemory();

    importContacts = new ImportContactsService(
      tagsRepositoryInMemory,
      contactsRepositoryInMemory
    );
  });

  it('should be able to import new contacts', async () => {
    const contactsFileStream = Readable.from([
      'email@email.com\n',
      'email@email.com.br\n',
      'johndoe@email.com.br\n',
    ]);

    await importContacts.execute(contactsFileStream, ['Students', 'Class A']);

    const createdTags = await tagsRepositoryInMemory.findAll();

    expect(createdTags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'students' }),
        expect.objectContaining({ title: 'class a' }),
      ])
    );

    const createdTagsId = createdTags.map((tag) => tag._id);

    const createdContacts = await contactsRepositoryInMemory.findAll();

    expect(createdContacts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: 'email@email.com',
          tags: createdTagsId,
        }),
        expect.objectContaining({
          email: 'email@email.com.br',
          tags: createdTagsId,
        }),
        expect.objectContaining({
          email: 'johndoe@email.com.br',
          tags: createdTagsId,
        }),
      ])
    );
  });

  it('should be able not recreate tags that already exist', async () => {
    const contactsFileStream = Readable.from([
      'email@email.com\n',
      'email@email.com.br\n',
      'johndoe@email.com.br\n',
    ]);

    await tagsRepositoryInMemory.create([{ title: 'Students' }]);

    await importContacts.execute(contactsFileStream, ['Students', 'Class A']);

    const createdTags = await tagsRepositoryInMemory.findAll();

    expect(createdTags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'students' }),
        expect.objectContaining({ title: 'class a' }),
      ])
    );
  });

  it.only('should be able not recreate contacts that already exist', async () => {
    const contactsFileStream = Readable.from([
      'email@email.com\n',
      'email@email.com.br\n',
      'johndoe@email.com.br\n',
    ]);

    const [tag] = await tagsRepositoryInMemory.create([{ title: 'Students' }]);

    await contactsRepositoryInMemory.create({
      email: 'email@email.com',
      tags: [tag.id],
    });

    await importContacts.execute(contactsFileStream, ['Class A']);

    const email = 'email@email.com';

    const contacts = await contactsRepositoryInMemory.findByEmail(email);

    expect(contacts.length).toBe(1);
    expect(contacts[0].tags).toEqual([
      expect.objectContaining({ title: 'students' }),
      expect.objectContaining({ title: 'class a' }),
    ]);
  });
});
