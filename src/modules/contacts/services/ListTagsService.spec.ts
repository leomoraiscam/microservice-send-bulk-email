import TagsRepositoryInMemory from '@modules/contacts/repositories/in-memory/TagsRepositoryInMemory';

import ListTagsService from './ListTagsService';

let listTagsService: ListTagsService;
let tagsRepositoryInMemory: TagsRepositoryInMemory;

describe('List Contacts From tags', () => {
  beforeEach(() => {
    tagsRepositoryInMemory = new TagsRepositoryInMemory();
    listTagsService = new ListTagsService(tagsRepositoryInMemory);
  });

  it('should be able to list tags', async () => {
    const tagsTools = [
      {
        title: 'Javascript',
      },
      {
        title: 'Typescript',
      },
    ];

    const tagsInfra = [
      {
        title: 'AWS',
      },
      {
        title: 'GCP',
      },
    ];

    const tagsFram = [
      {
        title: 'Nest.js',
      },
      {
        title: 'Express',
      },
    ];

    await tagsRepositoryInMemory.create(tagsTools);

    await tagsRepositoryInMemory.create(tagsInfra);

    await tagsRepositoryInMemory.create(tagsFram);

    const tags = await listTagsService.execute({
      take: 1,
      skip: 2,
    });

    expect(tags.length).toBe(2);
  });
});
