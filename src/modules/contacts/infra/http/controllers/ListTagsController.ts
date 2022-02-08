import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListTagsService from '../../../services/ListTagsService';

class ListTagsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { take, skip } = request.query;

    const listTags = container.resolve(ListTagsService);

    const tags = await listTags.execute({
      skip: Number(skip),
      take: Number(take),
    });

    return response.status(200).json(tags);
  }
}

export default ListTagsController;
