import { ContactModel } from '../infra/mongoose/schemas/Contact';

interface ITagsRepository {
  findOneAndUpdate(email: string, tags: string[]): Promise<void>;
  findAll(): Promise<ContactModel[]>;
}

export default ITagsRepository;
