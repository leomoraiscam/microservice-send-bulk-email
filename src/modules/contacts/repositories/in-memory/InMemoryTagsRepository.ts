import { v4 as uuidv4 } from 'uuid';

import Tag from '@modules/contacts/infra/typeorm/entities/Tag';
import IOptionsDTO from '@shared/dtos/IOptionsDTO';

import ICreateTagsDTO from '../../dtos/ICreateTagsDTO';
import paginateArray from '../../utils/paginateArrayInMemory';
import ITagsRepository from '../ITagsRepository';

class InMemoryTagsRepository implements ITagsRepository {
  private tags: Tag[] = [];

  async findByIds(ids: string[]): Promise<Tag[]> {
    return this.tags.filter((tag) => ids.includes(tag.id));
  }

  async findByTitle(title: string): Promise<Tag> {
    return this.tags.find((tag) => tag.title === title);
  }

  async list({ page, perPage }: IOptionsDTO): Promise<Tag[]> {
    page = page || 1;
    perPage = perPage || 10;

    return paginateArray(this.tags, perPage, page);
  }

  async create({ tags }: ICreateTagsDTO): Promise<Tag[]> {
    const tagsCreated = tags.map((tagData) => {
      const tag = new Tag();

      Object.assign(tag, {
        id: uuidv4(),
        title: tagData.title,
        created_at: new Date(),
        updated_at: new Date(),
      });

      return tag;
    });

    this.tags = this.tags.concat(tagsCreated);

    return tagsCreated;
  }
}

export default InMemoryTagsRepository;
