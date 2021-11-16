import { v4 as uuidv4 } from 'uuid';

import Contact from '@modules/contacts/infra/typeorm/entities/Contact';

import IContactsRepository from '../IContactsRepository';

class ContactsRepositoryInMemory implements IContactsRepository {
  private contacts: Contact[] = [];

  async findByEmail(email: string): Promise<Contact> {
    return this.contacts.find((contact) => contact.email === email);
  }

  async findById(id: string): Promise<Contact> {
    return this.contacts.find((contact) => contact.id === id);
  }

  async findByTags(tags: string[]): Promise<Contact[]> {
    return [
      {
        id: '671341f9-c178-4c04-8ab0-241f35547332',
        email: 'leozonnn@gmail.com',
        created_at: new Date(),
        updated_at: new Date(),
        tags: [
          {
            id: 'c1c331be-816b-45ad-839b-fadbb465fd3e',
            title: 'AWS',
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
      },
    ];
  }

  async create(email: string): Promise<Contact> {
    const contact = new Contact();

    Object.assign(contact, {
      id: uuidv4(),
      email,
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

export default ContactsRepositoryInMemory;
