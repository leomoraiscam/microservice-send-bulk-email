import { inject, injectable } from 'tsyringe';

import Contact from '@modules/contacts/infra/typeorm/entities/Contact';
import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';
import ITagsRepository from '@modules/contacts/repositories/ITagsRepository';
import AppError from '@shared/errors/AppError';

import ICreateTagsToContactDTO from '../dtos/ICreateTagsToContactDTO';

@injectable()
class CreateTagsToContactService {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository
  ) {}

  async execute({
    contact_id,
    tag_ids,
  }: ICreateTagsToContactDTO): Promise<Contact> {
    const contact = await this.contactsRepository.findById(contact_id);

    if (!contact) {
      throw new AppError("Contact doesn't exist", 404);
    }

    const tags = await this.tagsRepository.findByIds(tag_ids);

    if (!tags.length) {
      throw new AppError("Tags doesn't exist", 404);
    }

    Object.assign(contact, {
      tags,
    });

    await this.contactsRepository.save(contact);

    return contact;
  }
}

export default CreateTagsToContactService;
