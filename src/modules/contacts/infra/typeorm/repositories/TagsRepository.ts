import { getRepository, Repository } from 'typeorm';

import ITagsRepository from '@modules/contacts/repositories/ITagsRepository';
import { ICreateTagsDTO } from '@modules/contacts/services/CreateTagsService';

import Tag from '../entities/Tag';

class TagsRepository implements ITagsRepository {
  private repository: Repository<Tag>;

  constructor() {
    this.repository = getRepository(Tag);
  }

  public async findByIds(ids: string[]): Promise<Tag[]> {
    return this.repository.findByIds(ids);
  }

  async findByTitle(title: string): Promise<Tag> {
    return this.repository.findOne({
      where: {
        title,
      },
    });
  }

  async create(tags: ICreateTagsDTO[]): Promise<Tag[]> {
    const tgs = tags.map((tag) => this.repository.create(tag));

    await this.repository.save(tgs);

    return tgs;
  }
}

export default TagsRepository;
