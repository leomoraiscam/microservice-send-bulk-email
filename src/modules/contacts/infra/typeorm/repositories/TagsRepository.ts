import { getRepository, Repository } from 'typeorm';

import ICreateTagsDTO from '@modules/contacts/dtos/ICreateTagsDTO';
import ITagsRepository from '@modules/contacts/repositories/ITagsRepository';
import IOptionsDTO from '@shared/dtos/IOptionsDTO';

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

  async list({ page, perPage }: IOptionsDTO): Promise<Tag[]> {
    return this.repository.find({
      take: perPage,
      skip: perPage * (page - 1),
    });
  }

  async create({ tags, contact_id }: ICreateTagsDTO): Promise<Tag[]> {
    const createdTags = tags.map((tag) =>
      this.repository.create({
        title: tag.title,
        user_id: contact_id,
      })
    );

    await this.repository.save(createdTags);

    return createdTags;
  }
}

export default TagsRepository;
