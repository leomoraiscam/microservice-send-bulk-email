import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListTagsService from '@modules/contacts/services/ListTagsService';

class ListTagsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page, perPage } = request.query;

    const listTags = container.resolve(ListTagsService);

    const tags = await listTags.execute({
      page: Number(page),
      perPage: Number(perPage),
    });

    return response.status(200).json(tags);
  }
}

export default ListTagsController;
