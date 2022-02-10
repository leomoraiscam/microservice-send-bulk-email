import { inject, injectable } from 'tsyringe';

import Template from '../infra/typeorm/schemas/Template';
import ITemplateRepository from '../repositories/ITemplateRepository';

interface ICreateTemplateDTO {
  title: string;
  content: string;
  default?: boolean;
}

@injectable()
class CreateTemplateService {
  constructor(
    @inject('TemplatesRepository')
    private templatesRepository: ITemplateRepository
  ) {}

  async execute({ title, content }: ICreateTemplateDTO): Promise<Template> {
    const template = await this.templatesRepository.create({
      title,
      content,
    });

    return template;
  }
}

export default CreateTemplateService;
