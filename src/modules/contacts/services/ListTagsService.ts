import { inject, injectable } from 'tsyringe';

import IOptions from '@shared/dtos/IOptionsDTO';

import Tag from '../infra/typeorm/entities/Tag';
import ITagsRepository from '../repositories/ITagsRepository';

@injectable()
class ListContactsService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository
  ) {}

  async execute({ perPage, page }: IOptions): Promise<Tag[]> {
    return this.tagsRepository.list({
      perPage,
      page,
    });
  }
}

export default ListContactsService;
