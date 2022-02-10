import { getRepository, Repository } from 'typeorm';

import ICreateTagsDTO from '@modules/contacts/dtos/ICreateTagsDTO';
import ITagsRepository from '@modules/contacts/repositories/ITagsRepository';

import IOptions from '../../../dtos/IOptionsDTO';
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

  async list({ take, page }: IOptions): Promise<Tag[]> {
    const contacts = await this.repository.find({
      take,
      skip: take * (page - 1),
    });

    return contacts;
  }

  async create({ tags, user_id }: ICreateTagsDTO): Promise<Tag[]> {
    const tgs = tags.map((tag) =>
      this.repository.create({
        title: tag.title,
        user_id,
      })
    );

    await this.repository.save(tgs);

    return tgs;
  }
}

export default TagsRepository;
