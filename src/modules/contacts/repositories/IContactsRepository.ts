import Contact from '../infra/typeorm/entities/Contact';

interface IContactsRepository {
  findById(id: string): Promise<Contact>;
  findByEmail(email: string): Promise<Contact>;
  findByTags(tags: string[]): Promise<Contact[]>;
  create(email: string): Promise<Contact>;
  save(contact: Contact): Promise<void>;
}

export default IContactsRepository;
