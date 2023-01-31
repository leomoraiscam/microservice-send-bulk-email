import InMemoryTagsRepository from '@modules/contacts/repositories/in-memory/InMemoryTagsRepository';

import ListTagsService from './ListTagsService';

let listTagsService: ListTagsService;
let inMemoryTagsRepository: InMemoryTagsRepository;

describe('List Contacts From tags', () => {
  beforeEach(() => {
    inMemoryTagsRepository = new InMemoryTagsRepository();
    listTagsService = new ListTagsService(inMemoryTagsRepository);
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

    await inMemoryTagsRepository.create({
      tags: tagsTools,
      contact_id: null,
    });

    await inMemoryTagsRepository.create({
      tags: tagsInfra,
      contact_id: null,
    });

    await inMemoryTagsRepository.create({
      tags: tagsFram,
      contact_id: null,
    });

    const tags = await listTagsService.execute({
      perPage: 10,
      page: 1,
    });

    expect(tags.length).toBe(2);
  });
});
