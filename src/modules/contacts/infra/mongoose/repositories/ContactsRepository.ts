import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';

import Contact, { ContactModel } from '../schemas/Contact';

interface ICreateContactDTO {
  email: string;
  tags: string[];
}

class ContactsRepository implements IContactsRepository {
  async create({ email, tags }: ICreateContactDTO): Promise<void> {
    await Contact.create({
      email,
      tags,
    });
  }

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

  async findByEmail(email: string): Promise<ContactModel[]> {
    return Contact.find({ email });
  }
}

export default ContactsRepository;
