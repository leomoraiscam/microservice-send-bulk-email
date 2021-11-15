import csvParse from 'csv-parse';
import { Readable } from 'stream';
import { injectable, inject } from 'tsyringe';

import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';
import ITagsRepository from '@modules/contacts/repositories/ITagsRepository';

@injectable()
class ImportContactsService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository
  ) {}

  public async execute(
    contactsFileStream: Readable,
    tags: string[]
  ): Promise<void> {
    const parsers = csvParse({
      delimiter: ';',
    });

    const parseCSV = contactsFileStream.pipe(parsers);

    const existentTags = await this.tagsRepository.find(tags);

    const existentTagsTitles = existentTags.map((tag) => tag.title);

    const newTagsData = tags
      .filter((tag) => !existentTagsTitles.includes(tag))
      .map((tag) => ({ title: tag }));

    const createdTags = await this.tagsRepository.create(newTagsData);

    const tagsIds = createdTags.map((tag) => tag._id);

    parseCSV.on('data', async (line) => {
      const [email] = line;

      await this.contactsRepository.findOneAndUpdate(email, tagsIds);
    });

    await new Promise((resolve) => parseCSV.on('end', resolve));
  }
}

export default ImportContactsService;
