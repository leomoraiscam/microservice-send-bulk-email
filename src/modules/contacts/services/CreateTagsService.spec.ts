import AppError from '@shared/errors/AppError';

import TagsRepositoryInMemory from '../repositories/in-memory/TagsRepositoryInMemory';
import CreateTagsService from './CreateTagsService';

let tagsRepositoryInMemory: TagsRepositoryInMemory;
let createTags: CreateTagsService;

describe('Create Tag', () => {
  beforeEach(async () => {
    tagsRepositoryInMemory = new TagsRepositoryInMemory();

    createTags = new CreateTagsService(tagsRepositoryInMemory);
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

    const createdTags = await createTags.execute(tags);

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

    await expect(createTags.execute(tags)).rejects.toBeInstanceOf(AppError);
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

    await tagsRepositoryInMemory.create(tags);

    await expect(
      createTags.execute([
        {
          title: 'Javascript',
        },
      ])
    ).rejects.toBeInstanceOf(AppError);
  });
});
