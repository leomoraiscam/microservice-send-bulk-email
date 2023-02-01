import InMemoryContactsRepository from '@modules/contacts/repositories/in-memory/InMemoryContactsRepository';

import ListContactsService from './ListContactsService';

describe('ListContactsService', () => {
  let listContactsService: ListContactsService;
  let inMemoryContactsRepository: InMemoryContactsRepository;

  beforeEach(async () => {
    inMemoryContactsRepository = new InMemoryContactsRepository();
    listContactsService = new ListContactsService(inMemoryContactsRepository);

    await Promise.all([
      inMemoryContactsRepository.create({
        email: 'jiciptoh@redketa.ug',
        subscribed: true,
      }),
      inMemoryContactsRepository.create({
        email: 'eji@gumdudeku.ao',
        subscribed: true,
      }),
      inMemoryContactsRepository.create({
        email: 'ronjo@dac.na',
        subscribed: true,
      }),
    ]);
  });

  it('should be able list all contacts with default pagination values', async () => {
    const contacts = await listContactsService.execute({});

    expect(contacts.length).toBe(3);
  });

  it('should be able list contacts with custom pagination values', async () => {
    const page = 1;
    const perPage = 2;

    const movies = await listContactsService.execute({
      perPage,
      page,
    });

    expect(movies.length).toBe(2);
  });

  it('should be able list contacts in second page with two objects', async () => {
    const page = 2;
    const perPage = 1;

    const movies = await listContactsService.execute({
      perPage,
      page,
    });

    expect(movies.length).toBe(1);
  });

  it('should be able list contacts in second page with insufficient objects', async () => {
    const page = 2;
    const perPage = 10;

    const movies = await listContactsService.execute({
      perPage,
      page,
    });

    expect(movies.length).toBe(0);
  });
});
