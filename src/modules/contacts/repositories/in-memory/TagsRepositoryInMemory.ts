import { v4 as uuidv4 } from 'uuid';

import Tag from '@modules/contacts/infra/typeorm/entities/Tag';
import { ICreateTagsDTO } from '@modules/contacts/services/CreateTagsService';

import ITagsRepository from '../ITagsRepository';

class TagsRepositoryInMemory implements ITagsRepository {
  private tags: Tag[] = [];

  async findByIds(ids: string[]): Promise<Tag[]> {
    const allTags = this.tags.filter((tag) => ids.includes(tag.id));

    return allTags;
  }

  async findByTitle(title: string): Promise<Tag> {
    return this.tags.find((tag) => tag.title === title);
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
