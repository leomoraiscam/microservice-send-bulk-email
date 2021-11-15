import { ContactModel } from '../infra/mongoose/schemas/Contact';

interface ICreateContactDTO {
  email: string;
  tags: string[];
}

interface ITagsRepository {
  create({ tags, email }: ICreateContactDTO): Promise<void>;
  findOneAndUpdate(email: string, tags: string[]): Promise<void>;
  findAll(): Promise<ContactModel[]>;
  findByEmail(email: string): Promise<ContactModel[]>;
}

export default ITagsRepository;
