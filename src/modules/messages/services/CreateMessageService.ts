import { inject, injectable } from 'tsyringe';

import MailQueue from '@config/redis';
import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';
import IQueueProvider from '@shared/container/providers/QueueProvider/models/IQueueProvider';
import AppError from '@shared/errors/AppError';

import Message from '../infra/typeorm/schemas/Message';
import IMessageRepository from '../repositories/IMessageRepository';

interface IRequest {
  messageData: {
    subject: string;
    body: string;
  };
  tags: string[];
}

@injectable()
class CreateMessageService {
  constructor(
    @inject('MessagesRepository')
    private messagesRepository: IMessageRepository,
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,
    @inject('QueueProvider')
    private queueProvider: IQueueProvider
  ) {}

  async execute({ messageData, tags }: IRequest): Promise<Message> {
    const message = await this.messagesRepository.create(messageData);

    const recipients = await this.contactsRepository.findByTags(tags);

    if (!recipients.length) {
      throw new AppError('recipients does not exist');
    }

    await Promise.all(
      recipients.map((recipient) => {
        return this.queueProvider.add({
          to: recipient.email,
          messageData,
        });
      })
    );

    return message;
  }
}

export default CreateMessageService;
