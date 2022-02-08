import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Contact from '../infra/typeorm/entities/Contact';
import IContactsRepository from '../repositories/IContactsRepository';

interface IChangeStatus {
  contact_id: string;
  subscribed: boolean;
}

@injectable()
class ChangeContactSubscriptionStatusService {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository
  ) {}

  async execute({ contact_id, subscribed }: IChangeStatus): Promise<Contact> {
    const contact = await this.contactsRepository.findById(contact_id);

    if (!contact) {
      throw new AppError('Contact not exists');
    }

    contact.subscribed = subscribed;

    await this.contactsRepository.save(contact);

    return contact;
  }
}

export default ChangeContactSubscriptionStatusService;
