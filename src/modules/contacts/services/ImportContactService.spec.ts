import { Readable } from 'stream';

import ContactsRepositoryInMemory from '../repositories/in-memory/ContactsRepositoryInMemory';
import ImportContactsService from './ImportContactsService';

let contactsRepositoryInMemory: ContactsRepositoryInMemory;
let importContacts: ImportContactsService;

describe('Import Contacts', () => {
  beforeEach(async () => {
    contactsRepositoryInMemory = new ContactsRepositoryInMemory();

    importContacts = new ImportContactsService(contactsRepositoryInMemory);
  });

  it('should be able to import new contacts', async () => {
    const contactsFileStream = Readable.from([
      'email@email.com\n',
      'email@email.com.br\n',
      'johndoe@email.com.br\n',
    ]);

    await importContacts.execute(contactsFileStream);

    /* expect(createdContacts).toEqual(
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
    ); */
  });

  it('should be able not recreate tags that already exist', async () => {
    const contactsFileStream = Readable.from([
      'email@email.com\n',
      'email@email.com.br\n',
      'johndoe@email.com.br\n',
    ]);

    // await tagsRepositoryInMemory.create([{ title: 'Students' }]);

    await importContacts.execute(contactsFileStream);

    // const createdTags = await tagsRepositoryInMemory.findAll();

    /* expect(createdTags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'students' }),
        expect.objectContaining({ title: 'class a' }),
      ])
    ); */
  });

  it('should be able not recreate contacts that already exist', async () => {
    const contactsFileStream = Readable.from([
      'email@email.com\n',
      'email@email.com.br\n',
      'johndoe@email.com.br\n',
    ]);

    await importContacts.execute(contactsFileStream);

    const email = 'email@email.com';

    await contactsRepositoryInMemory.create(email);

    // const contacts = await contactsRepositoryInMemory.findByEmail(email);

    /* expect(contacts.length).toBe(1);
    expect(contacts[0].tags).toEqual([
      expect.objectContaining({ title: 'students' }),
      expect.objectContaining({ title: 'class a' }),
    ]); */
  });
});
