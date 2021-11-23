import { v4 as uuidv4 } from 'uuid';

import Contact from '@modules/contacts/infra/typeorm/entities/Contact';

import IContactsRepository from '../IContactsRepository';

class ContactsRepositoryInMemory implements IContactsRepository {
  private contacts: Contact[] = [];

  async findById(id: string): Promise<Contact> {
    return this.contacts.find((contact) => contact.id === id);
  }

  async findByEmail(email: string): Promise<Contact> {
    return this.contacts.find((contact) => contact.email === email);
  }

  async findByTags(tags: string[]): Promise<Contact[]> {
    let isTagIncludeInContact = false;

    const contacts = this.contacts.filter((contact) => {
      const tagsContacts = contact.tags.map((tag) => tag.id);

      for (const tagId of tagsContacts) {
        isTagIncludeInContact = tags.includes(tagId);
      }

      return isTagIncludeInContact;
    });

    return contacts;
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
