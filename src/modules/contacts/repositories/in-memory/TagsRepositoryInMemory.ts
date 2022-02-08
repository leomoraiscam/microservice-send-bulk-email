import { v4 as uuidv4 } from 'uuid';

import Tag from '@modules/contacts/infra/typeorm/entities/Tag';

import ICreateTagsDTO from '../../dtos/ICreateTagsDTO';
import paginateArray from '../../utils/paginateArrayInMemory';
import ITagsRepository from '../ITagsRepository';

interface IOptions {
  take?: number;
  skip?: number;
}

class TagsRepositoryInMemory implements ITagsRepository {
  private tags: Tag[] = [];

  async findByIds(ids: string[]): Promise<Tag[]> {
    const allTags = this.tags.filter((tag) => ids.includes(tag.id));

    return allTags;
  }

  async findByTitle(title: string): Promise<Tag> {
    return this.tags.find((tag) => tag.title === title);
  }

  async list({ skip, take }: IOptions): Promise<Tag[]> {
    const takeValue = take || 1;
    const skipValue = skip || 10;

    const paginateContacts = paginateArray(this.tags, skipValue, takeValue);

    return paginateContacts;
  }

  async create(tags: ICreateTagsDTO[]): Promise<Tag[]> {
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

export default TagsRepositoryInMemory;
