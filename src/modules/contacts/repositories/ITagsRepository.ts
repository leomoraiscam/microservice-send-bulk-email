import ICreateTagsDTO from '../dtos/ICreateTagsDTO';
import Tag from '../infra/typeorm/entities/Tag';

interface IOptions {
  take?: number;
  skip?: number;
}

interface ITagsRepository {
  findByIds(ids: string[]): Promise<Tag[]>;
  findByTitle(title: string): Promise<Tag>;
  list({ skip, take }: IOptions): Promise<Tag[]>;
  create(tags: ICreateTagsDTO[]): Promise<Tag[]>;
}

export default ITagsRepository;
