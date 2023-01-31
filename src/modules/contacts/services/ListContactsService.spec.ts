import InMemoryContactsRepository from '@modules/contacts/repositories/in-memory/InMemoryContactsRepository';

import ListContactsService from './ListContactsService';

let listContactsService: ListContactsService;
let inMemoryContactsRepository: InMemoryContactsRepository;

describe('List Contacts From tags', () => {
  beforeEach(() => {
    inMemoryContactsRepository = new InMemoryContactsRepository();
    listContactsService = new ListContactsService(inMemoryContactsRepository);
  });

  it('should be able to list contacts', async () => {
    const email = 'lmorais@gmail.com';

    await inMemoryContactsRepository.create({
      email,
      subscribed: true,
    });

    await inMemoryContactsRepository.create({
      email: 'l@gmail.com',
      subscribed: true,
    });

    await inMemoryContactsRepository.create({
      email: 'lm@gmail.com',
      subscribed: true,
    });

    const contacts = await listContactsService.execute({
      perPage: 1,
      page: 2,
    });

    expect(contacts.length).toBe(2);
  });
});
