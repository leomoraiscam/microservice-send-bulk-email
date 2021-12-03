import { inject, injectable } from 'tsyringe';

import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';
import ILoggerProvider from '@shared/container/providers/LoggerProvider/models/ILoggerProvider';
import IQueueProvider from '@shared/container/providers/QueueProvider/models/IQueueProvider';
import AppError from '@shared/errors/AppError';

import IMessageRepository from '../repositories/IMessageRepository';

interface IRequest {
  id: string;
  tags: string[];
}

@injectable()
class SendMessageService {
  constructor(
    @inject('MessagesRepository')
    private messageRepository: IMessageRepository,
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,
    @inject('QueueProvider')
    private queueProvider: IQueueProvider,
    @inject('LoggerProvider')
    private loggerProvider: ILoggerProvider
  ) {}

  async execute({ id, tags }: IRequest): Promise<void> {
    const message = await this.messageRepository.findById(id);

    if (!message) {
      throw new AppError('Message not found', 404);
    }

    const contacts = await this.contactsRepository.findByTags(tags);

    if (!contacts.length) {
      throw new AppError('recipients does not exist');
    }

    const queueJobs = contacts.map((contact) => ({
      contact,
      message,
    }));

    await this.queueProvider.add(queueJobs);

    this.loggerProvider.log(
      'warn',
      `[${message.subject}] - Recipients added to queue`,
      {
        messageId: message.id,
      }
    );
  }
}

export default SendMessageService;
