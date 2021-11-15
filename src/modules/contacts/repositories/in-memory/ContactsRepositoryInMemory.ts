import Contact, {
  ContactModel,
  ContactAttributes,
} from '@modules/contacts/infra/mongoose/schemas/Contact';

import IContactsRepository from '../IContactsRepository';

interface ICreateContactDTO {
  email: string;
  tags: string[];
}

class ContactsRepositoryInMemory implements IContactsRepository {
  private contacts: ContactAttributes[] = [];

  async create({ email, tags }: ICreateContactDTO): Promise<void> {
    const contact = new Contact();

    Object.assign(contact, {
      email,
      tags,
    });

    this.contacts.push(contact);
  }

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

  async findByEmail(email: string): Promise<ContactModel[]> {
    return this.contacts.filter(
      (contact) => contact.email === email
    ) as ContactModel[];
  }
}

export default ContactsRepositoryInMemory;
