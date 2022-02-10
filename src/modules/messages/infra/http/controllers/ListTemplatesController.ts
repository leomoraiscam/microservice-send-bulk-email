import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListTemplatesService from '../../../services/ListTemplatesService';

class ListTemplatesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { take, skip, page } = request.query;

    const listTemplates = container.resolve(ListTemplatesService);

    const templates = await listTemplates.execute({
      skip: Number(skip),
      take: Number(take),
      page: Number(page),
    });

    return response.status(200).json(templates);
  }
}

export default ListTemplatesController;
