import { inject, injectable } from 'tsyringe';

import Contact from '../infra/typeorm/entities/Contact';
import IContactsRepository from '../repositories/IContactsRepository';

interface IOptions {
  take: number;
  skip: number;
}

@injectable()
class ListContactsService {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository
  ) {}

  async execute({ take, skip }: IOptions): Promise<Contact[]> {
    return this.contactsRepository.list({
      take,
      skip,
    });
  }
}

export default ListContactsService;
