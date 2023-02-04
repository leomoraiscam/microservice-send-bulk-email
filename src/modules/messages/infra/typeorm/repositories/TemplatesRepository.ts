import { getMongoRepository, MongoRepository } from 'typeorm';

import ICreateTemplateDTO from '@modules/messages/dtos/ICreateTemplatesDTO';
import ITemplatesRepository from '@modules/messages/repositories/ITemplatesRepository';
import IOptions from '@shared/dtos/IOptionsDTO';

import Template from '../schemas/Template';

class TemplatesRepository implements ITemplatesRepository {
  private repository: MongoRepository<Template>;

  constructor() {
    this.repository = getMongoRepository(Template, 'mongo');
  }

  async list({ page, perPage }: IOptions): Promise<Template[]> {
    return this.repository.find({
      take: perPage,
      skip: perPage * (page - 1),
    });
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
