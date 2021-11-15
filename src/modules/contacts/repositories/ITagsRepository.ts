import { TagModel } from '../infra/mongoose/schemas/Tag';

interface ICreateTagDTO {
  title: string;
}

interface ITagsRepository {
  create(data: ICreateTagDTO[]): Promise<TagModel[]>;
  find(tags: string[]): Promise<TagModel[]>;
  findAll(): Promise<TagModel[]>;
}

export default ITagsRepository;
