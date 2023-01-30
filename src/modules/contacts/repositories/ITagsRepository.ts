import ICreateTagsDTO from '@modules/contacts/dtos/ICreateTagsDTO';
import IOptionsDTO from '@shared/dtos/IOptionsDTO';

import Tag from '../infra/typeorm/entities/Tag';

interface ITagsRepository {
  findByIds(ids: string[]): Promise<Tag[]>;
  findByTitle(title: string): Promise<Tag>;
  list(options?: IOptionsDTO): Promise<Tag[]>;
  create(tags: ICreateTagsDTO): Promise<Tag[]>;
}

export default ITagsRepository;
