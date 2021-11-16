import ContactsRepositoryInMemory from '@modules/contacts/repositories/in-memory/ContactsRepositoryInMemory';
import TagsRepositoryInMemory from '@modules/contacts/repositories/in-memory/TagsRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import CreateTagContactService from './CreateTagContactService';

let createTagContactService: CreateTagContactService;
let tagsRepositoryInMemory: TagsRepositoryInMemory;
let contactsRepositoryInMemory: ContactsRepositoryInMemory;

describe('Create Tag Contacts', () => {
  beforeEach(() => {
    contactsRepositoryInMemory = new ContactsRepositoryInMemory();
    tagsRepositoryInMemory = new TagsRepositoryInMemory();
    createTagContactService = new CreateTagContactService(
      contactsRepositoryInMemory,
      tagsRepositoryInMemory
    );
  });

  it('should be able to add a new tags to the contacts', async () => {
    const email = 'lmorais@gmail.com';
    const tags = [
      {
        title: 'Node.js',
      },
      {
        title: 'Nest.js',
      },
    ];

    const contact = await contactsRepositoryInMemory.create(email);

    const [tag] = await tagsRepositoryInMemory.create(tags);

    const contact_id = contact.id;
    const tags_ids = [tag.id];

    const tagsContacts = await createTagContactService.execute({
      contact_id,
      tags_ids,
    });

    expect(tagsContacts).toHaveProperty('tags');
    expect(tagsContacts.tags.length).toBe(1);
  });

  it('should not be able to add a new specifications to the car non-exist', async () => {
    const contact_id = '123';
    const tags_ids = ['12345', '54321'];

    await expect(
      createTagContactService.execute({ contact_id, tags_ids })
    ).rejects.toBeInstanceOf(AppError);
  });
});
