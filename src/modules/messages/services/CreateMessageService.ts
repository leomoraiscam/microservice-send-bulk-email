import { inject, injectable } from 'tsyringe';

import Message from '../infra/typeorm/schemas/Message';
import IMessageRepository from '../repositories/IMessageRepository';

interface IRequest {
  messageData: {
    subject: string;
    body: string;
  };
}

@injectable()
class CreateMessageService {
  constructor(
    @inject('MessagesRepository')
    private messagesRepository: IMessageRepository
  ) {}

  async execute({ messageData }: IRequest): Promise<Message> {
    const message = await this.messagesRepository.create(messageData);

    return message;
  }
}

export default CreateMessageService;
