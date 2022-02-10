import { v4 as uuidv4 } from 'uuid';

import IOptions from '@modules/contacts/dtos/IOptionsDTO';
import paginateArray from '@modules/contacts/utils/paginateArrayInMemory';

import Template from '../../infra/typeorm/schemas/Template';
import ITemplateRepository from '../ITemplateRepository';

interface ICreateTemplateDTO {
  title: string;
  content: string;
  default?: boolean;
}

class MessagesRepositoryInMemory implements ITemplateRepository {
  private templates: Template[] = [];

  async list({ skip, take }: IOptions): Promise<Template[]> {
    const takeValue = take || 1;
    const skipValue = skip || 10;

    const paginateTemplates = paginateArray(
      this.templates,
      skipValue,
      takeValue
    );

    return paginateTemplates;
  }

  async create({ title, content }: ICreateTemplateDTO): Promise<Template> {
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

export default MessagesRepositoryInMemory;
