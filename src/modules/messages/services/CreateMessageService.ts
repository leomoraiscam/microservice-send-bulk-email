import { inject, injectable } from 'tsyringe';

import MailQueue from '@config/redis';
import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';
import AppError from '@shared/errors/AppError';

import Message from '../infra/typeorm/schemas/Message';
import IMessageRepository from '../repositories/IMessageRepository';

@injectable()
class CreateMessageService {
  constructor(
    @inject('MessagesRepository')
    private messagesRepository: IMessageRepository,
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository
  ) {}

  async execute(
    messageData: {
      subject: string;
      body: string;
    },
    tags: string[]
  ): Promise<Message> {
    const message = await this.messagesRepository.create(messageData);

    const recipients = await this.contactsRepository.findByTags(tags);

    if (!recipients.length) {
      throw new AppError('recipients does not exist');
    }

    await Promise.all(
      recipients.map((recipient) => {
        return MailQueue.add({
          to: recipient.email,
          messageData,
        });
      })
    );

    return message;
  }
}

export default CreateMessageService;
