import ICreateTagsDTO from '../dtos/ICreateMessagesDTO';
import Message from '../infra/typeorm/schemas/Message';

interface IMessageRepository {
  create(data: ICreateTagsDTO): Promise<Message>;
}

export default IMessageRepository;
