import { v4 as uuidv4 } from 'uuid';

import Tag from '@modules/contacts/infra/typeorm/entities/Tag';
import { ICreateTagsDTO } from '@modules/contacts/services/CreateTagsService';

import ITagsRepository from '../ITagsRepository';

class TagsRepositoryInMemory implements ITagsRepository {
  private tags: Tag[] = [];

  async findByIds(ids: string[]): Promise<Tag[]> {
    const allSpecifications = this.tags.filter((tag) => ids.includes(tag.id));

    return allSpecifications;
  }

  async findByTitle(title: string): Promise<Tag> {
    return this.tags.find((tag) => tag.title === title);
  }

  async create(tags: ICreateTagsDTO[]): Promise<Tag[]> {
    const tgs = tags.map((tag) => {
      const t = new Tag();

      Object.assign(t, {
        id: uuidv4(),
        title: tag.title,
        created_at: new Date(),
        updated_at: new Date(),
      });

      return t;
    });

    this.tags = this.tags.concat(tgs);

    return tgs;
  }
}

export default TagsRepositoryInMemory;
