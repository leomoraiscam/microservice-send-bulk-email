import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllUsersService from '../../../services/ListAllUsersService';

class ListUsersController {
  async handle(_: Request, response: Response): Promise<Response> {
    const listAllUsers = container.resolve(ListAllUsersService);

    const users = await listAllUsers.execute();

    return response.status(200).json(users);
  }
}

export default ListUsersController;
