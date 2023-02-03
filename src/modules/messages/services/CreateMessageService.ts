import { inject, injectable } from 'tsyringe';

import ICreateMessagesDTO from '../dtos/ICreateMessagesDTO';
import Message from '../infra/typeorm/schemas/Message';
import IMessagesRepository from '../repositories/IMessagesRepository';

@injectable()
class CreateMessageService {
  constructor(
    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository
  ) {}

  async execute({ body, subject }: ICreateMessagesDTO): Promise<Message> {
    return this.messagesRepository.create({
      body,
      subject,
    });
  }
}

export default CreateMessageService;
