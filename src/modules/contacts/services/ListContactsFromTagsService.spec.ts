import ContactsRepositoryInMemory from '@modules/contacts/repositories/in-memory/ContactsRepositoryInMemory';
import TagsRepositoryInMemory from '@modules/contacts/repositories/in-memory/TagsRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import CreateTagContactService from './CreateTagContactService';
import ListContactsFromTagsService from './ListContactsFromTagsService';

let createTagContactService: CreateTagContactService;
let tagsRepositoryInMemory: TagsRepositoryInMemory;
let contactsRepositoryInMemory: ContactsRepositoryInMemory;
let listContactsFromTagsService: ListContactsFromTagsService;

describe('List Contacts From tags', () => {
  beforeEach(() => {
    contactsRepositoryInMemory = new ContactsRepositoryInMemory();
    tagsRepositoryInMemory = new TagsRepositoryInMemory();
    createTagContactService = new CreateTagContactService(
      contactsRepositoryInMemory,
      tagsRepositoryInMemory
    );
    listContactsFromTagsService = new ListContactsFromTagsService(
      contactsRepositoryInMemory
    );
  });

  it('should be able to list contacts of received tags', async () => {
    const email = 'lmorais@gmail.com';
    const tags = [
      {
        title: 'Node.js',
      },
      {
        title: 'Nest.js',
      },
    ];

    const contact = await contactsRepositoryInMemory.create({
      email,
      subscribed: true,
    });

    const [tag] = await tagsRepositoryInMemory.create(tags);

    const contact_id = contact.id;
    const tags_ids = [tag.id];

    await createTagContactService.execute({
      contact_id,
      tags_ids,
    });

    const contacts = await listContactsFromTagsService.execute({
      tags: [tag.id],
    });

    expect(contacts.length).toBe(1);
  });

  it('should not be able to list the contacts when the contact to tag non-exist', async () => {
    const contact_id = '123';

    await expect(
      listContactsFromTagsService.execute({
        tags: [contact_id],
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
