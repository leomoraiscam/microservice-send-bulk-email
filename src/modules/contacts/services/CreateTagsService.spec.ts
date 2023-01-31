import AppError from '@shared/errors/AppError';

import InMemoryTagsRepository from '../repositories/in-memory/InMemoryTagsRepository';
import CreateTagsService from './CreateTagsService';

let inMemoryTagsRepository: InMemoryTagsRepository;
let createTags: CreateTagsService;

describe('Create Tag', () => {
  beforeEach(async () => {
    inMemoryTagsRepository = new InMemoryTagsRepository();

    createTags = new CreateTagsService(inMemoryTagsRepository);
  });

  it('should be able to create new tags', async () => {
    const tags = [
      {
        title: 'Javascript',
      },
      {
        title: 'Typescript',
      },
    ];

    const createdTags = await createTags.execute({
      tags,
      user_id: null,
    });

    expect(createdTags[0]).toHaveProperty('id');
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
      createTags.execute({
        tags,
        user_id: null,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create new tags if already exist', async () => {
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
      user_id: null,
    });

    await expect(
      createTags.execute({
        tags: [
          {
            title: 'Javascript',
          },
        ],
        user_id: null,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
