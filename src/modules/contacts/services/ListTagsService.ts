import { inject, injectable } from 'tsyringe';

import IOptions from '../dtos/IOptionsDTO';
import Tag from '../infra/typeorm/entities/Tag';
import ITagsRepository from '../repositories/ITagsRepository';

@injectable()
class ListContactsService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository
  ) {}

  async execute({ take, skip, page }: IOptions): Promise<Tag[]> {
    return this.tagsRepository.list({
      take,
      skip,
      page,
    });
  }
}

export default ListContactsService;
