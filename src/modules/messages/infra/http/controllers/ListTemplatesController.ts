import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListTemplatesService from '../../../services/ListTemplatesService';

class ListTemplatesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page, perPage } = request.query;

    const listTemplates = container.resolve(ListTemplatesService);

    const templates = await listTemplates.execute({
      page: Number(page),
      perPage: Number(perPage),
    });

    return response.status(200).json(templates);
  }
}

export default ListTemplatesController;
