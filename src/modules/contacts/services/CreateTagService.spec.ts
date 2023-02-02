import InMemoryContactsRepository from '@modules/contacts/repositories/in-memory/InMemoryContactsRepository';
import AppError from '@shared/errors/AppError';

import InMemoryTagsRepository from '../repositories/in-memory/InMemoryTagsRepository';
import CreateTagService from './CreateTagService';

describe('CreateTagService', () => {
  let inMemoryTagsRepository: InMemoryTagsRepository;
  let inMemoryContactsRepository: InMemoryContactsRepository;
  let createTagService: CreateTagService;
  let contact_id;

  beforeEach(async () => {
    inMemoryContactsRepository = new InMemoryContactsRepository();
    inMemoryTagsRepository = new InMemoryTagsRepository();
    createTagService = new CreateTagService(inMemoryTagsRepository);

    const contact = await inMemoryContactsRepository.create({
      email: 'levigugo@bebot.jp',
      subscribed: true,
    });

    contact_id = contact.id;
  });

  it('should be able to create multiple tags when receive correct data', async () => {
    const tags = [
      {
        title: 'Javascript',
      },
      {
        title: 'Typescript',
      },
    ];

    const createdTags = await createTagService.execute({
      tags,
      contact_id,
    });

    expect(createdTags.length).toBe(2);
  });

  it('should not be able to create new tags if exist duplicate tags', async () => {
    const tags = [
      {
        title: 'Javascript',
      },
      {
        title: 'Javascript',
      },
    ];

    await expect(
      createTagService.execute({
        tags,
        contact_id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create tag if the same already exist', async () => {
    const tags = [
      {
        title: 'Javascript',
      },
      {
        title: 'Typescript',
      },
    ];

    await inMemoryTagsRepository.create({
      tags,
      contact_id,
    });

    await expect(
      createTagService.execute({
        tags: [
          {
            title: 'Javascript',
          },
        ],
        contact_id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
