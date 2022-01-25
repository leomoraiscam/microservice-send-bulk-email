import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateRoleService from '@modules/roles/services/CreateRoleService';

class CreateRolesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createRoles = container.resolve(CreateRoleService);

    await createRoles.execute({
      name,
      description,
    });

    return response.status(201).send();
  }
}

export default CreateRolesController;
