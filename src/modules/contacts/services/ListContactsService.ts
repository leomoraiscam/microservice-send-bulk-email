import { inject, injectable } from 'tsyringe';

import IOptions from '../dtos/IOptionsDTO';
import Contact from '../infra/typeorm/entities/Contact';
import IContactsRepository from '../repositories/IContactsRepository';

@injectable()
class ListContactsService {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository
  ) {}

  async execute({ take, skip, page }: IOptions): Promise<Contact[]> {
    return this.contactsRepository.list({
      take,
      skip,
      page,
    });
  }
}

export default ListContactsService;
