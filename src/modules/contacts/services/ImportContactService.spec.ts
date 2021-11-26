import StorageProviderInMemory from '@shared/container/providers/StorageProvider/in-memory/StorageProviderInMemory';

import ContactsRepositoryInMemory from '../repositories/in-memory/ContactsRepositoryInMemory';
import ImportContactsService from './ImportContactsService';

let contactsRepositoryInMemory: ContactsRepositoryInMemory;
let storageProviderInMemory: StorageProviderInMemory;
let importContacts: ImportContactsService;

describe('Import Contacts', () => {
  beforeEach(async () => {
    contactsRepositoryInMemory = new ContactsRepositoryInMemory();
    storageProviderInMemory = new StorageProviderInMemory();

    importContacts = new ImportContactsService(
      contactsRepositoryInMemory,
      storageProviderInMemory
    );
  });

  it('should be able to import new contacts', async () => {});
});
