import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListContactsService from '../../../services/ListContactsService';

class ListContactsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { take, skip } = request.query;

    const listContactsService = container.resolve(ListContactsService);

    const contacts = await listContactsService.execute({
      skip: Number(skip),
      take: Number(take),
    });

    return response.status(200).json(contacts);
  }
}

export default ListContactsController;
