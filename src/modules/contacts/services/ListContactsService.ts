import { inject, injectable } from 'tsyringe';

import IOptions from '@shared/dtos/IOptionsDTO';

import Contact from '../infra/typeorm/entities/Contact';
import IContactsRepository from '../repositories/IContactsRepository';

@injectable()
class ListContactsService {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository
  ) {}

  async execute({ perPage, page }: IOptions): Promise<Contact[]> {
    return this.contactsRepository.list({
      page,
      perPage,
    });
  }
}

export default ListContactsService;
