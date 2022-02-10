import { getMongoRepository, MongoRepository } from 'typeorm';

import IOptions from '@modules/contacts/dtos/IOptionsDTO';
import ITemplateRepository from '@modules/messages/repositories/ITemplateRepository';

import Template from '../schemas/Template';

interface ICreateTemplateDTO {
  title: string;
  content: string;
  default?: boolean;
}

class TemplateRepository implements ITemplateRepository {
  private repository: MongoRepository<Template>;

  constructor() {
    this.repository = getMongoRepository(Template, 'mongo');
  }

  async list({ take, page }: IOptions): Promise<Template[]> {
    const templates = await this.repository.find({
      take,
      skip: take * (page - 1),
    });

    return templates;
  }

  async create({ content, title }: ICreateTemplateDTO): Promise<Template> {
    const template = this.repository.create({
      content,
      title,
    });

    await this.repository.save(template);

    return template;
  }
}

export default TemplateRepository;
