import ContactsRepositoryInMemory from '@modules/contacts/repositories/in-memory/ContactsRepositoryInMemory';

import ListContactsService from './ListContactsService';

let listContactsService: ListContactsService;
let contactsRepositoryInMemory: ContactsRepositoryInMemory;

describe('List Contacts From tags', () => {
  beforeEach(() => {
    contactsRepositoryInMemory = new ContactsRepositoryInMemory();
    listContactsService = new ListContactsService(contactsRepositoryInMemory);
  });

  it('should be able to list contacts', async () => {
    const email = 'lmorais@gmail.com';

    await contactsRepositoryInMemory.create({
      email,
      subscribed: true,
    });

    await contactsRepositoryInMemory.create({
      email: 'l@gmail.com',
      subscribed: true,
    });

    await contactsRepositoryInMemory.create({
      email: 'lm@gmail.com',
      subscribed: true,
    });

    const contacts = await listContactsService.execute({
      take: 1,
      skip: 2,
    });

    expect(contacts.length).toBe(2);
  });
});
