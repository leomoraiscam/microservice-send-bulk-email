import { v4 as uuidv4 } from 'uuid';

import ICreateMessagesDTO from '../../dtos/ICreateMessagesDTO';
import Message from '../../infra/typeorm/schemas/Message';
import IMessageRepository from '../IMessageRepository';

class MessagesRepositoryInMemory implements IMessageRepository {
  private messages: Message[] = [];

  async findById(id: string): Promise<Message> {
    return this.messages.find((message) => message.id === id);
  }

  async create({ subject, body }: ICreateMessagesDTO): Promise<Message> {
    const message = new Message();

    Object.assign(message, {
      subject,
      body,
      id: uuidv4(),
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.messages.push(message);

    return message;
  }
}

export default MessagesRepositoryInMemory;
