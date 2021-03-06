import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreateTagsDTO from '../dtos/ICreateTagsDTO';
import Tag from '../infra/typeorm/entities/Tag';
import ITagsRepository from '../repositories/ITagsRepository';
import checkDuplicateTags from '../utils/checkDuplicateTags';

@injectable()
class CreateTagsService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository
  ) {}

  async execute({ user_id, tags }: ICreateTagsDTO): Promise<Tag[]> {
    const hasTagsWithSameTitle = checkDuplicateTags(tags);

    if (hasTagsWithSameTitle) {
      throw new AppError('tag already exist', 409);
    }

    const hasTagsWithSameTitleRequest = tags.map(async ({ title }) => {
      const foundTag = await this.tagsRepository.findByTitle(title);

      if (foundTag) {
        throw new AppError('tag already exist', 409);
      }
    });

    await Promise.all(hasTagsWithSameTitleRequest);

    const createdTags = await this.tagsRepository.create({
      tags,
      user_id,
    });

    return createdTags;
  }
}

export default CreateTagsService;
