import Message from '../../infra/typeorm/schemas/Message';
import IMessageRepository from '../IMessageRepository';

interface ICreateTagsDTO {
  subject: string;
  body: string;
}

class MessagesRepositoryInMemory implements IMessageRepository {
  private messages: Message[] = [];

  async create({ subject, body }: ICreateTagsDTO): Promise<Message> {
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
