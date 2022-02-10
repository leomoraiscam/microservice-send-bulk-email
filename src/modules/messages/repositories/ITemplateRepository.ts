import IOptions from '@modules/contacts/dtos/IOptionsDTO';

import Template from '../infra/typeorm/schemas/Template';

interface ICreateTemplateDTO {
  title: string;
  content: string;
  default?: boolean;
}

interface ITemplateRepository {
  list({ skip, take }: IOptions): Promise<Template[]>;
  create(data: ICreateTemplateDTO): Promise<Template>;
}

export default ITemplateRepository;
