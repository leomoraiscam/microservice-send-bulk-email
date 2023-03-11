import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateRoleService from '@modules/accessControlList/services/CreateRoleService';

class CreateRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createRoles = container.resolve(CreateRoleService);

    const role = await createRoles.execute({
      name,
      description,
    });

    return response.status(201).json(role);
  }
}

export default CreateRoleController;
