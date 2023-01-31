import InMemoryContactsRepository from '@modules/contacts/repositories/in-memory/InMemoryContactsRepository';
import InMemoryTagsRepository from '@modules/contacts/repositories/in-memory/InMemoryTagsRepository';
import AppError from '@shared/errors/AppError';

import CreateTagContactService from './CreateTagContactService';
import ListContactsFromTagsService from './ListContactsFromTagsService';

let createTagContactService: CreateTagContactService;
let inMemoryTagsRepository: InMemoryTagsRepository;
let inMemoryContactsRepository: InMemoryContactsRepository;
let listContactsFromTagsService: ListContactsFromTagsService;

describe('List Contacts From tags', () => {
  beforeEach(() => {
    inMemoryContactsRepository = new InMemoryContactsRepository();
    inMemoryTagsRepository = new InMemoryTagsRepository();
    createTagContactService = new CreateTagContactService(
      inMemoryContactsRepository,
      inMemoryTagsRepository
    );
    listContactsFromTagsService = new ListContactsFromTagsService(
      inMemoryContactsRepository
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

    const contact = await inMemoryContactsRepository.create({
      email,
      subscribed: true,
    });

    const [tag] = await inMemoryTagsRepository.create({
      tags,
      user_id: null,
    });

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
