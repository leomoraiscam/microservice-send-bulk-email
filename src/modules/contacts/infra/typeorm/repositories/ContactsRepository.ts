import { getRepository, Like, Repository } from 'typeorm';

import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';

import Contact from '../entities/Contact';

class ContactsRepository implements IContactsRepository {
  private repository: Repository<Contact>;

  constructor() {
    this.repository = getRepository(Contact);
  }

  async findById(id: string): Promise<Contact> {
    return this.repository.findOne(id);
  }

  async findByEmail(email: string): Promise<Contact> {
    return this.repository.findOne({
      where: {
        email,
      },
    });
  }

  async findByTags(tags: string[]): Promise<Contact[]> {
    const values = await this.repository
      .createQueryBuilder('cont')
      .leftJoinAndSelect('cont.tags', 'tags')
      // .where('cont.tags LIKE :tags', { tags }).
      .execute();

    return values;
  }

  async create(email: string): Promise<Contact> {
    const contact = this.repository.create({
      email,
    });

    await this.repository.save(contact);

    return contact;
  }

  async save(contact: Contact): Promise<void> {
    await this.repository.save(contact);
  }
}

export default ContactsRepository;
