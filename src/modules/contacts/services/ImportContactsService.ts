import csvParse from 'csv-parse';
import { Readable } from 'stream';
import { injectable, inject } from 'tsyringe';

import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';

@injectable()
class ImportContactsService {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository
  ) {}

  public async execute(contactsFileStream: Readable): Promise<void> {
    const parsers = csvParse({
      delimiter: ';',
    });

    const parseCSV = contactsFileStream.pipe(parsers);

    parseCSV.on('data', async (line) => {
      const [email] = line;

      const existContact = await this.contactsRepository.findByEmail(email);

      if (!existContact) {
        await this.contactsRepository.create(email);
      }
    });

    await new Promise((resolve) => parseCSV.on('end', resolve));
  }
}

export default ImportContactsService;
