import IOptionsDTO from '@shared/dtos/IOptionsDTO';

import ICreateContactsDTO from '../dtos/ICreateContactsDTO';
import Contact from '../infra/typeorm/entities/Contact';

interface IContactsRepository {
  findById(id: string): Promise<Contact>;
  findByEmail(email: string): Promise<Contact>;
  findByTags(tags: string[]): Promise<Contact[]>;
  list(options?: IOptionsDTO): Promise<Contact[]>;
  create(data: ICreateContactsDTO): Promise<Contact>;
  save(contact: Contact): Promise<void>;
}

export default IContactsRepository;
