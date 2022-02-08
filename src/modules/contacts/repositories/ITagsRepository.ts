import ICreateTagsDTO from '../dtos/ICreateTagsDTO';
import IOptions from '../dtos/IOptionsDTO';
import Tag from '../infra/typeorm/entities/Tag';

interface ITagsRepository {
  findByIds(ids: string[]): Promise<Tag[]>;
  findByTitle(title: string): Promise<Tag>;
  list({ skip, take }: IOptions): Promise<Tag[]>;
  create(tags: ICreateTagsDTO[]): Promise<Tag[]>;
}

export default ITagsRepository;
