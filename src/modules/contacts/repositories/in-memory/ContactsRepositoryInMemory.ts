import {
  ContactModel,
  ContactAttributes,
} from '@modules/contacts/infra/mongoose/schemas/Contact';

import IContactsRepository from '../IContactsRepository';

class ContactsRepositoryInMemory implements IContactsRepository {
  private contacts: ContactAttributes[] = [];

  async findOneAndUpdate(email: string, tagsIds: string[]): Promise<void> {
    const contactsIndex = this.contacts.findIndex(
      (contact) => contact.email === email
    );

    if (contactsIndex > 0) {
      this.contacts[contactsIndex].email = email;
      this.contacts[contactsIndex].tags = tagsIds;
    } else {
      this.contacts.push({
        email,
        tags: tagsIds,
      });
    }
  }

  async findAll(): Promise<ContactModel[]> {
    return this.contacts as ContactModel[];
  }
}

export default ContactsRepositoryInMemory;
