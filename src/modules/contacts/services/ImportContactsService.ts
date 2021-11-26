import csvParse from 'csv-parse';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

@injectable()
class ImportContactsService {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute(file: string): Promise<void> {
    const contactsReadStream = fs.createReadStream(file);

    const parsers = csvParse({
      delimiter: ';',
    });

    const parseCSV = contactsReadStream.pipe(parsers);

    await this.storageProvider.save(file);

    return new Promise((resolve, reject) => {
      parseCSV
        .on('data', async (line) => {
          const [email] = line;

          const existContact = await this.contactsRepository.findByEmail(email);

          if (!existContact) {
            await this.contactsRepository.create(email);
          }
        })
        .on('end', () => {
          fs.promises.unlink(file);
          resolve();
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }
}

export default ImportContactsService;
