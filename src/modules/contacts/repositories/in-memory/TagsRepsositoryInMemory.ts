import { v4 as uuidv4 } from 'uuid';

import Tag, { TagModel } from '@modules/contacts/infra/mongoose/schemas/Tag';

import ITagsRepository from '../ITagsRepository';

interface ICreateTagDTO {
  title: string;
}

class TagsRepositoryInMemory implements ITagsRepository {
  private tags: TagModel[] = [];

  async create(tags: ICreateTagDTO[]): Promise<TagModel[]> {
    const tgs = tags.map((tag) => {
      const tagObj = new Tag();

      Object.assign(tagObj, {
        id: uuidv4(),
        title: tag.title,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return tagObj;
    });

    this.tags = this.tags.concat(tgs);

    return tgs;
  }

  async find(tags: string[]): Promise<TagModel[]> {
    const tgs = this.tags.filter((tag) => tags.includes(tag.title));

    return tgs;
  }

  async findAll(): Promise<TagModel[]> {
    return this.tags;
  }
}

export default TagsRepositoryInMemory;
