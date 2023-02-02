import InMemoryTemplatesRepository from '@modules/messages/repositories/in-memory/InMemoryTemplatesRepository';

import ListTemplatesService from './ListTemplatesService';

describe('ListTemplatesService', () => {
  let listTemplatesService: ListTemplatesService;
  let inMemoryTemplatesRepository: InMemoryTemplatesRepository;

  beforeEach(async () => {
    inMemoryTemplatesRepository = new InMemoryTemplatesRepository();
    listTemplatesService = new ListTemplatesService(
      inMemoryTemplatesRepository
    );

    await Promise.all([
      inMemoryTemplatesRepository.create({
        title: 'Hello Word',
        content: '<p>just testing the email</p>',
      }),
      inMemoryTemplatesRepository.create({
        title: 'Hello Word',
        content: '<p>just testing the email</p>',
      }),
      inMemoryTemplatesRepository.create({
        title: 'Hello Word',
        content: '<p>just testing the email</p>',
      }),
    ]);
  });

  it('should be able list all templates with default pagination values', async () => {
    const contacts = await listTemplatesService.execute({});

    expect(contacts.length).toBe(3);
  });

  it('should be able list templates with custom pagination values', async () => {
    const page = 1;
    const perPage = 2;

    const movies = await listTemplatesService.execute({
      perPage,
      page,
    });

    expect(movies.length).toBe(1);
  });

  it('should be able list templates in second page with two objects', async () => {
    const page = 2;
    const perPage = 1;

    const movies = await listTemplatesService.execute({
      perPage,
      page,
    });

    expect(movies.length).toBe(1);
  });

  it('should be able list templates in second page with insufficient objects', async () => {
    const page = 2;
    const perPage = 10;

    const movies = await listTemplatesService.execute({
      perPage,
      page,
    });

    expect(movies.length).toBe(0);
  });
});
