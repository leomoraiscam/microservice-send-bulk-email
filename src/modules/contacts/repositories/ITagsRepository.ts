import { ICreateTagsDTO } from '@modules/contacts/services/CreateTagsService';

import Tag from '../infra/typeorm/entities/Tag';

interface ITagsRepository {
  create(tags: ICreateTagsDTO[]): Promise<Tag[]>;
  findByIds(ids: string[]): Promise<Tag[]>;
  findByTitle(title: string): Promise<Tag>;
}

export default ITagsRepository;
