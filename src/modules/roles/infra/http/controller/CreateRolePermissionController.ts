import { Response, Request } from 'express';
import { container } from 'tsyringe';

import createRolePermissionService from '@modules/roles/services/CreateRolePermissionService.';

class CreateRolePermissionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { permissions } = request.body;
    const { role_id } = request.params;

    const createRolePermission = container.resolve(createRolePermissionService);

    const createdPermissionRole = await createRolePermission.execute({
      permissions,
      role_id,
    });

    return response.status(201).json(createdPermissionRole);
  }
}

export default CreateRolePermissionController;
