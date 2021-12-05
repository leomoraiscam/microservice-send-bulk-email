import { getMongoRepository, MongoRepository } from 'typeorm';

import ICreateMessagesDTO from '@modules/messages/dtos/ICreateMessagesDTO';
import IMessageRepository from '@modules/messages/repositories/IMessageRepository';

import Message from '../schemas/Message';

class MessageRepository implements IMessageRepository {
  private repository: MongoRepository<Message>;

  constructor() {
    this.repository = getMongoRepository(Message, 'mongo');
  }

  async findById(id: string): Promise<Message> {
    return this.repository.findOne(id);
  }

  async create({ body, subject }: ICreateMessagesDTO): Promise<Message> {
    const message = this.repository.create({
      body,
      subject,
    });

    await this.repository.save(message);

    return message;
  }
}

export default MessageRepository;
