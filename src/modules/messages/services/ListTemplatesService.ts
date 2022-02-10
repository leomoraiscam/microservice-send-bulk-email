import { inject, injectable } from 'tsyringe';

import IOptions from '../dtos/IOptionsDTO';
import Template from '../infra/typeorm/schemas/Template';
import ITemplateRepository from '../repositories/ITemplateRepository';

@injectable()
class ListContactsService {
  constructor(
    @inject('TemplatesRepository')
    private templatesRepository: ITemplateRepository
  ) {}

  async execute({ take, skip, page }: IOptions): Promise<Template[]> {
    return this.templatesRepository.list({
      take,
      skip,
      page,
    });
  }
}

export default ListContactsService;
