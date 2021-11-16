import Contact from '../infra/typeorm/entities/Contact';

interface IContactsRepository {
  create(email: string): Promise<Contact>;
  save(contact: Contact): Promise<void>;
  findById(id: string): Promise<Contact>;
  findByEmail(email: string): Promise<Contact>;
  findByTags(tags: string[]): Promise<Contact[]>;
}

export default IContactsRepository;
