import IOptionsDTO from '@shared/dtos/IOptionsDTO';

import ICreateTemplatesDTO from '../dtos/ICreateTemplatesDTO';
import Template from '../infra/typeorm/schemas/Template';

interface ITemplatesRepository {
  list(options?: IOptionsDTO): Promise<Template[]>;
  create(data: ICreateTemplatesDTO): Promise<Template>;
}

export default ITemplatesRepository;
