import IStorageProvider from '../models/IStorageProvider';

class StorageProviderInMemory implements IStorageProvider {
  private storage: string[] = [];

  async save(file: string): Promise<string> {
    this.storage.push(file);

    return file;
  }
}

export default StorageProviderInMemory;
