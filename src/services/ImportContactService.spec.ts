import mongoose from 'mongoose';
import { Readable } from 'stream';

import Contact from '../schemas/Contact';
import Tag from '../schemas/Tag';
import ImportContactsService from './ImportContactsService';

describe('Import', () => {
  beforeAll(async () => {
    if (!process.env.MONGO_URL) {
      throw new Error('MongoDB server not initialized');
    }

    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Contact.deleteMany({});
  });

  it('should be able to import new contacts', async () => {
    const contactsFileStream = Readable.from([
      'email@email.com\n',
      'email@email.com.br\n',
      'johndoe@email.com.br\n',
    ]);

    const importContacts = new ImportContactsService();

    await importContacts.run(contactsFileStream, ['Students', 'Class A']);

    const createdTags = await Tag.find({});

    expect(createdTags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'students' }),
        expect.objectContaining({ title: 'class a' }),
      ])
    );

    const createdTagsId = createdTags.map((tag) => tag._id);

    const createdContacts = await Contact.find({}).lean();

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

    const importContacts = new ImportContactsService();

    await Tag.create({ title: 'Students' });

    await importContacts.run(contactsFileStream, ['Students', 'Class A']);

    const createdTags = await Tag.find({}).lean();

    expect(createdTags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'students' }),
        expect.objectContaining({ title: 'class a' }),
      ])
    );
  });

  it('should be able not recreate contacts that already exist', async () => {
    const contactsFileStream = Readable.from([
      'email@email.com\n',
      'email@email.com.br\n',
      'johndoe@email.com.br\n',
    ]);

    const importContacts = new ImportContactsService();

    const tag = await Tag.create({ title: 'Students' });
    await Contact.create({ email: 'email@email.com', tags: [tag._id] });

    await importContacts.run(contactsFileStream, ['Class A']);

    const contacts = await Contact.find({ email: 'email@email.com' })
      .populate('tags')
      .lean();

    expect(contacts.length).toBe(1);
    expect(contacts[0].tags).toEqual([
      expect.objectContaining({ title: 'students' }),
      expect.objectContaining({ title: 'class a' }),
    ]);
  });
});
