import { inject, injectable } from 'tsyringe';

import IOptionsDTO from '@shared/dtos/IOptionsDTO';

import Template from '../infra/typeorm/schemas/Template';
import ITemplatesRepository from '../repositories/ITemplatesRepository';

@injectable()
class ListTemplatesService {
  constructor(
    @inject('TemplatesRepository')
    private templatesRepository: ITemplatesRepository
  ) {}

  async execute({ page, perPage }: IOptionsDTO): Promise<Template[]> {
    return this.templatesRepository.list({
      page,
      perPage,
    });
  }
}

export default ListTemplatesService;
