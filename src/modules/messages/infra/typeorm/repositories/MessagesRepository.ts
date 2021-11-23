import { getMongoRepository, MongoRepository } from 'typeorm';

import IMessageRepository from '@modules/messages/repositories/IMessageRepository';

import Message from '../schemas/Message';

interface ICreateTagsDTO {
  subject: string;
  body: string;
}

class MessageRepository implements IMessageRepository {
  private repository: MongoRepository<Message>;

  constructor() {
    this.repository = getMongoRepository(Message, 'mongo');
  }

  async create({ body, subject }: ICreateTagsDTO): Promise<Message> {
    const contact = this.repository.create({
      body,
      subject,
    });

    await this.repository.save(contact);

    return contact;
  }
}

export default MessageRepository;
