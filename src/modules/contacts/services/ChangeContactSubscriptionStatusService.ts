import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import HttpStatusCode from '@shared/errors/StatusCodes';

import IChangeStatusDTO from '../dtos/IChangeContactStatusDTO';
import Contact from '../infra/typeorm/entities/Contact';
import IContactsRepository from '../repositories/IContactsRepository';

@injectable()
class ChangeContactSubscriptionStatusService {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository
  ) {}

  async execute({
    contact_id,
    subscribed,
  }: IChangeStatusDTO): Promise<Contact> {
    const contact = await this.contactsRepository.findById(contact_id);

    if (!contact) {
      throw new AppError("Contact doesn't exist", HttpStatusCode.NOT_FOUND);
    }

    Object.assign(contact, {
      subscribed,
    });

    await this.contactsRepository.save(contact);

    return contact;
  }
}

export default ChangeContactSubscriptionStatusService;
