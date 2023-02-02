import InMemoryContactsRepository from '@modules/contacts/repositories/in-memory/InMemoryContactsRepository';
import InMemoryTagsRepository from '@modules/contacts/repositories/in-memory/InMemoryTagsRepository';
import AppError from '@shared/errors/AppError';

import CreateTagContactService from './CreateTagsToContactService';

describe('CreateTagsToContactService', () => {
  let createTagContactService: CreateTagContactService;
  let inMemoryTagsRepository: InMemoryTagsRepository;
  let inMemoryContactsRepository: InMemoryContactsRepository;

  beforeEach(() => {
    inMemoryContactsRepository = new InMemoryContactsRepository();
    inMemoryTagsRepository = new InMemoryTagsRepository();
    createTagContactService = new CreateTagContactService(
      inMemoryContactsRepository,
      inMemoryTagsRepository
    );
  });

  it('should be able to add multiples tags to specific contacts', async () => {
    const email = 'zir@iti.hk';

    const tags = [
      {
        title: 'NodeJs',
      },
      {
        title: 'ExpressJs',
      },
    ];

    const { id } = await inMemoryContactsRepository.create({
      email,
      subscribed: true,
    });

    const [firstTag, secondTag] = await inMemoryTagsRepository.create({
      tags,
      contact_id: id,
    });

    const tag_ids = [firstTag.id, secondTag.id];

    const tagsOfContact = await createTagContactService.execute({
      contact_id: id,
      tag_ids,
    });

    expect(tagsOfContact.tags.length).toBe(2);
  });

  it('should not be able to add tags to a non-exist', async () => {
    await expect(
      createTagContactService.execute({
        contact_id: 'id-non-exist',
        tag_ids: [],
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
