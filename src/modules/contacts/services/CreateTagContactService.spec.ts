import InMemoryContactsRepository from '@modules/contacts/repositories/in-memory/InMemoryContactsRepository';
import InMemoryTagsRepository from '@modules/contacts/repositories/in-memory/InMemoryTagsRepository';
import AppError from '@shared/errors/AppError';

import CreateTagContactService from './CreateTagContactService';

let createTagContactService: CreateTagContactService;
let inMemoryTagsRepository: InMemoryTagsRepository;
let inMemoryContactsRepository: InMemoryContactsRepository;

describe('Create Tag Contacts', () => {
  beforeEach(() => {
    inMemoryContactsRepository = new InMemoryContactsRepository();
    inMemoryTagsRepository = new InMemoryTagsRepository();
    createTagContactService = new CreateTagContactService(
      inMemoryContactsRepository,
      inMemoryTagsRepository
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
