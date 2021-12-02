import { ObjectID } from 'typeorm';

import ICreateMessagesDTO from '../../dtos/ICreateMessagesDTO';
import Message from '../../infra/typeorm/schemas/Message';
import IMessageRepository from '../IMessageRepository';

class MessagesRepositoryInMemory implements IMessageRepository {
  private messages: Message[] = [];

  async findById(id: string): Promise<Message> {
    return {
      subject: 'Umbriel - Email de confirmação',
      body: 'Esqueceu a sua senha?',
      created_at: new Date(),
      updated_at: new Date(),
      id: new ObjectID(),
    };
  }

  async create({ subject, body }: ICreateMessagesDTO): Promise<Message> {
    const message = new Message();

    Object.assign(message, {
      subject,
      body,
    });

    this.messages.push(message);

    return message;
  }
}

export default MessagesRepositoryInMemory;
