import { getMongoRepository, MongoRepository } from 'typeorm';

import ICreateMessagesDTO from '@modules/messages/dtos/ICreateMessagesDTO';
import IMessagesRepository from '@modules/messages/repositories/IMessagesRepository';

import Message from '../schemas/Message';

class MessagesRepository implements IMessagesRepository {
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

export default MessagesRepository;
