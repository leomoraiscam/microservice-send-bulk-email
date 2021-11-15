import ITagsRepository from '@modules/contacts/repositories/ITagsRepository';

import Tag, { TagModel } from '../schemas/Tag';

interface ICreateTagDTO {
  title: string;
}

class TagsRepository implements ITagsRepository {
  async create(tags: ICreateTagDTO[]): Promise<TagModel[]> {
    const tgs = await Tag.create(tags);

    return tgs;
  }

  async find(tags: string[]): Promise<TagModel[]> {
    const tgs = await Tag.find({
      title: {
        $in: tags,
      },
    });

    return tgs;
  }

  async findAll(): Promise<TagModel[]> {
    return Tag.find({});
  }
}

export default TagsRepository;
