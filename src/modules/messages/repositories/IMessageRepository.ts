import Message from '../infra/typeorm/schemas/Message';

interface ICreateTagsDTO {
  subject: string;
  body: string;
}

interface IMessageRepository {
  create(data: ICreateTagsDTO): Promise<Message>;
}

export default IMessageRepository;
