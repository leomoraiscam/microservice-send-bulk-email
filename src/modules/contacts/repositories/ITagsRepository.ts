import ICreateTagsDTO from '../dtos/ICreateTagsDTO';
import Tag from '../infra/typeorm/entities/Tag';

interface ITagsRepository {
  findByIds(ids: string[]): Promise<Tag[]>;
  findByTitle(title: string): Promise<Tag>;
  create(tags: ICreateTagsDTO[]): Promise<Tag[]>;
}

export default ITagsRepository;
