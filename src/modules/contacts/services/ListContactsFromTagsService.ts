import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Contact from '../infra/typeorm/entities/Contact';
import IContactsRepository from '../repositories/IContactsRepository';

interface IRequest {
  tags: string[];
}

@injectable()
class ListContactsFromTagsService {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository
  ) {}

  async execute({ tags }: IRequest): Promise<Contact[]> {
    const contacts = await this.contactsRepository.findByTags(tags);

    if (!contacts) {
      throw new AppError('Contact not exists');
    }

    return contacts;
  }
}

export default ListContactsFromTagsService;
