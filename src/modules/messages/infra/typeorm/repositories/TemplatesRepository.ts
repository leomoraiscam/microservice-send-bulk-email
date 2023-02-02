import { getMongoRepository, MongoRepository } from 'typeorm';

import ITemplatesRepository from '@modules/messages/repositories/ITemplatesRepository';
import IOptions from '@shared/dtos/IOptionsDTO';

import ICreateTemplateDTO from '../../../dtos/ICreateTemplatesDTO';
import Template from '../schemas/Template';

class TemplatesRepository implements ITemplatesRepository {
  private repository: MongoRepository<Template>;

  constructor() {
    this.repository = getMongoRepository(Template, 'mongo');
  }

  async list({ page, perPage }: IOptions): Promise<Template[]> {
    const templates = await this.repository.find({
      take: perPage,
      skip: perPage * (page - 1),
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

export default TemplatesRepository;
