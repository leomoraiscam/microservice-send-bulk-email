import { v4 as uuidv4 } from 'uuid';

import paginateArray from '@modules/contacts/utils/paginateArrayInMemory';
import IOptionsDTO from '@shared/dtos/IOptionsDTO';

import ICreateTemplatesDTO from '../../dtos/ICreateTemplatesDTO';
import Template from '../../infra/typeorm/schemas/Template';
import ITemplatesRepository from '../ITemplatesRepository';

class InMemoryTemplatesRepository implements ITemplatesRepository {
  private templates: Template[] = [];

  async list({ page, perPage }: IOptionsDTO): Promise<Template[]> {
    page = perPage || 1;
    perPage = perPage || 10;

    return paginateArray(this.templates, perPage, page);
  }

  async create({ title, content }: ICreateTemplatesDTO): Promise<Template> {
    const template = new Template();

    Object.assign(template, {
      title,
      content,
      id: uuidv4(),
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.templates.push(template);

    return template;
  }
}

export default InMemoryTemplatesRepository;
