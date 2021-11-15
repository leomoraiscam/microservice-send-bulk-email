import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';

import Contact, { ContactModel } from '../schemas/Contact';

class ContactsRepository implements IContactsRepository {
  async findOneAndUpdate(email: string, tagsIds: string[]): Promise<void> {
    await Contact.findOneAndUpdate(
      { email },
      {
        $addToSet: {
          tags: tagsIds,
        },
      },
      {
        upsert: true,
      }
    );
  }

  async findAll(): Promise<ContactModel[]> {
    return Contact.find({}).lean();
  }
}

export default ContactsRepository;
