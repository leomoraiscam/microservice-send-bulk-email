import StorageProviderInMemory from '@shared/container/providers/StorageProvider/in-memory/StorageProviderInMemory';

import InMemoryContactsRepository from '../repositories/in-memory/InMemoryContactsRepository';
import ImportContactsService from './ImportContactsService';

let inMemoryContactsRepository: InMemoryContactsRepository;
let storageProviderInMemory: StorageProviderInMemory;
let importContacts: ImportContactsService;

describe('Import Contacts', () => {
  beforeEach(async () => {
    inMemoryContactsRepository = new InMemoryContactsRepository();
    storageProviderInMemory = new StorageProviderInMemory();

    importContacts = new ImportContactsService(
      inMemoryContactsRepository,
      storageProviderInMemory
    );
  });

  it('should be able to import new contacts', async () => {});
});
