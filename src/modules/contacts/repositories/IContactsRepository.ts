import IOptions from '../dtos/IOptionsDTO';
import Contact from '../infra/typeorm/entities/Contact';

interface ICrateContacts {
  email: string;
  subscribed: boolean;
}

interface IContactsRepository {
  findById(id: string): Promise<Contact>;
  findByEmail(email: string): Promise<Contact>;
  findByTags(tags: string[]): Promise<Contact[]>;
  list({ skip, take }: IOptions): Promise<Contact[]>;
  create(data: ICrateContacts): Promise<Contact>;
  save(contact: Contact): Promise<void>;
}

export default IContactsRepository;
