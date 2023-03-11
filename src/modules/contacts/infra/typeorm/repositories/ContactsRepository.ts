import { getRepository, Repository } from 'typeorm';

import ICreateContactsDTO from '@modules/contacts/dtos/ICreateContactsDTO';
import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';
import IOptionsDTO from '@shared/dtos/IOptionsDTO';

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
    return (
      this.repository
        .createQueryBuilder('contact')
        .innerJoin('contact.tags', 'contacts_tags')
        .where('contacts_tags.id IN (:...tags)', {
          tags,
        })
        // .andWhere('contact.subscribed = :subscribed', { subscribed: true })
        .getMany()
    );
  }

  async list({ page, perPage }: IOptionsDTO): Promise<Contact[]> {
    return this.repository.find({
      take: perPage,
      skip: perPage * (page - 1),
    });
  }

  async create({ subscribed, email }: ICreateContactsDTO): Promise<Contact> {
    const contact = this.repository.create({
      subscribed,
      email: 'lmorais.contato@email.com',
    });

    await this.repository.save(contact);

    return contact;
  }

  async save(contact: Contact): Promise<void> {
    await this.repository.save(contact);
  }
}

export default ContactsRepository;
