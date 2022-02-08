import { inject, injectable } from 'tsyringe';

import Tag from '../infra/typeorm/entities/Tag';
import ITagsRepository from '../repositories/ITagsRepository';

interface IOptions {
  take: number;
  skip: number;
}

@injectable()
class ListContactsService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository
  ) {}

  async execute({ take, skip }: IOptions): Promise<Tag[]> {
    return this.tagsRepository.list({
      take,
      skip,
    });
  }
}

export default ListContactsService;
