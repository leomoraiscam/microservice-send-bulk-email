import { getMongoRepository, MongoRepository } from 'typeorm';

import ICreateMessagesDTO from '@modules/messages/dtos/ICreateMessagesDTO';
import IMessageRepository from '@modules/messages/repositories/IMessageRepository';

import Message from '../schemas/Message';

class MessageRepository implements IMessageRepository {
  private repository: MongoRepository<Message>;

  constructor() {
    this.repository = getMongoRepository(Message, 'mongo');
  }

  async create({ body, subject }: ICreateMessagesDTO): Promise<Message> {
    const contact = this.repository.create({
      body,
      subject,
    });

    await this.repository.save(contact);

    return contact;
  }
}

export default MessageRepository;
