import { v4 as uuidv4 } from 'uuid';

import Contact from '@modules/contacts/infra/typeorm/entities/Contact';
import IOptionsDTO from '@shared/dtos/IOptionsDTO';

import ICreateContactsDTO from '../../dtos/ICreateContactsDTO';
import paginateArray from '../../utils/paginateArrayInMemory';
import IContactsRepository from '../IContactsRepository';

class InMemoryContactsRepository implements IContactsRepository {
  private contacts: Contact[] = [];

  async findById(id: string): Promise<Contact> {
    return this.contacts.find((contact) => contact.id === id);
  }

  async findByEmail(email: string): Promise<Contact> {
    return this.contacts.find((contact) => contact.email === email);
  }

  async findByTags(tags: string[]): Promise<Contact[]> {
    let isTagIncludeInContact = false;

    return this.contacts
      .filter((contact) => {
        const tagsContacts = contact.tags.map((tag) => tag.id);

        for (const tagId of tagsContacts) {
          isTagIncludeInContact = tags.includes(tagId);
        }

        return isTagIncludeInContact;
      })
      .filter((contact) => contact.subscribed === true);
  }

  async list({ page, perPage }: IOptionsDTO): Promise<Contact[]> {
    page = page || 1;
    perPage = perPage || 10;

    const paginateContacts = paginateArray(this.contacts, page, perPage);

    return paginateContacts;
  }

  async create({ email, subscribed }: ICreateContactsDTO): Promise<Contact> {
    const contact = new Contact();

    Object.assign(contact, {
      id: uuidv4(),
      email,
      subscribed,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.contacts.push(contact);

    return contact;
  }

  async save(contact: Contact): Promise<void> {
    const findIndex = this.contacts.findIndex(
      (findContact) => findContact.id === contact.id
    );

    this.contacts[findIndex] = contact;
  }
}

export default InMemoryContactsRepository;
