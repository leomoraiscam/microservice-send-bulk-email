import { inject, injectable } from 'tsyringe';

import ICreateTemplatesDTO from '../dtos/ICreateTemplatesDTO';
import Template from '../infra/typeorm/schemas/Template';
import ITemplatesRepository from '../repositories/ITemplatesRepository';

@injectable()
class CreateTemplateService {
  constructor(
    @inject('TemplatesRepository')
    private templatesRepository: ITemplatesRepository
  ) {}

  async execute({ title, content }: ICreateTemplatesDTO): Promise<Template> {
    const template = await this.templatesRepository.create({
      title,
      content,
    });

    return template;
  }
}

export default CreateTemplateService;
