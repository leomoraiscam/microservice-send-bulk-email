import { Response, Request } from 'express';
import { container } from 'tsyringe';

import createPermissionsRoleService from '@modules/accessControlList/services/CreatePermissionsRoleService';

class CreatePermissionsRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { permissions } = request.body;
    const { role_id } = request.params;

    const createPermissionsRole = container.resolve(
      createPermissionsRoleService
    );

    const createdPermissionRole = await createPermissionsRole.execute({
      permissions,
      role_id,
    });

    return response.status(201).json(createdPermissionRole);
  }
}

export default CreatePermissionsRoleController;
