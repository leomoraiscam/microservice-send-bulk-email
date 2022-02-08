import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreatePermissionsService from '@modules/accessControlList/services/CreatePermissionsService';

class CreatePermissionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createPermissions = container.resolve(CreatePermissionsService);

    await createPermissions.execute({
      name,
      description,
    });

    return response.status(201).send();
  }
}

export default CreatePermissionsController;
