import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListContactsService from '@modules/contacts/services/ListContactsService';

class ListContactsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page, perPage } = request.query;

    const listContactsService = container.resolve(ListContactsService);

    const contacts = await listContactsService.execute({
      page: Number(page),
      perPage: Number(perPage),
    });

    return response.status(200).json(contacts);
  }
}

export default ListContactsController;
