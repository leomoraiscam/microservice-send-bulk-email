import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreatePermissionService from '@modules/accessControlList/services/CreatePermissionService';

class CreatePermissionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createPermission = container.resolve(CreatePermissionService);

    const permission = await createPermission.execute({
      name,
      description,
    });

    return response.status(201).json(permission);
  }
}

export default CreatePermissionsController;
