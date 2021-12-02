import ICreateTagsDTO from '../dtos/ICreateMessagesDTO';
import Message from '../infra/typeorm/schemas/Message';

interface IMessageRepository {
  findById(id: string): Promise<Message>;
  create(data: ICreateTagsDTO): Promise<Message>;
}

export default IMessageRepository;
