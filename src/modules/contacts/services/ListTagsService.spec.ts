import { v4 as uuidv4 } from 'uuid';

import InMemoryTagsRepository from '@modules/contacts/repositories/in-memory/InMemoryTagsRepository';

import Contact from '../infra/typeorm/entities/Contact';
import ListTagsService from './ListTagsService';

describe('ListTagsService', () => {
  let listTagsService: ListTagsService;
  let inMemoryTagsRepository: InMemoryTagsRepository;
  let contact_id;

  beforeEach(async () => {
    inMemoryTagsRepository = new InMemoryTagsRepository();
    listTagsService = new ListTagsService(inMemoryTagsRepository);

    const tags = [
      {
        title: 'Javascript',
      },
      {
        title: 'Typescript',
      },
      {
        title: 'AWS',
      },
      {
        title: 'GCP',
      },
      {
        title: 'Nest.js',
      },
      {
        title: 'Express',
      },
    ];

    const { id }: Contact = {
      id: uuidv4(),
      email: 'lu@ace.sm',
      subscribed: true,
      created_at: new Date(),
      updated_at: new Date(),
      tags: [],
    };

    contact_id = id;

    await inMemoryTagsRepository.create({
      tags,
      contact_id,
    });
  });

  it('should be able list all tags with default pagination values', async () => {
    const contacts = await listTagsService.execute({});

    expect(contacts.length).toBe(6);
  });

  it('should be able list tags with custom pagination values', async () => {
    const page = 1;
    const perPage = 2;

    const movies = await listTagsService.execute({
      perPage,
      page,
    });

    expect(movies.length).toBe(2);
  });

  it('should be able list tags in second page with two objects', async () => {
    const page = 2;
    const perPage = 1;

    const movies = await listTagsService.execute({
      perPage,
      page,
    });

    expect(movies.length).toBe(1);
  });

  it('should be able list tags in second page with insufficient objects', async () => {
    const page = 2;
    const perPage = 10;

    const movies = await listTagsService.execute({
      perPage,
      page,
    });

    expect(movies.length).toBe(0);
  });
});
