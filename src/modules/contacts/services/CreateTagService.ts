import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreateTagsDTO from '../dtos/ICreateTagsDTO';
import Tag from '../infra/typeorm/entities/Tag';
import ITagsRepository from '../repositories/ITagsRepository';
import checkDuplicateTags from '../utils/checkDuplicateTags';

@injectable()
class CreateTagService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository
  ) {}

  async execute({ contact_id, tags }: ICreateTagsDTO): Promise<Tag[]> {
    const hasTagsWithSameTitle = checkDuplicateTags({
      tags,
    });

    if (hasTagsWithSameTitle) {
      throw new AppError('Tag already exist', 409);
    }

    const hasTagsWithSameTitleRequest = tags.map(async ({ title }) => {
      const foundTag = await this.tagsRepository.findByTitle(title);

      if (foundTag) {
        throw new AppError('Tag already exist', 409);
      }
    });

    await Promise.all(hasTagsWithSameTitleRequest);

    return this.tagsRepository.create({
      tags,
      contact_id,
    });
  }
}

export default CreateTagService;
