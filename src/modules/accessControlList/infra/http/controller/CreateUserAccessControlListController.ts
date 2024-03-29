import { Response, Request } from 'express';
import { container } from 'tsyringe';

import createUserAccessControlListService from '@modules/accessControlList/services/CreateAccessControlListToUserService';

class CreateUserAccessControlListController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { permissions, roles } = request.body;
    const { user_id } = request.params;

    const createUserACL = container.resolve(createUserAccessControlListService);

    const accessControlListToUser = await createUserACL.execute({
      user_id,
      permissions,
      roles,
    });

    return response.status(201).json(accessControlListToUser);
  }
}

export default CreateUserAccessControlListController;
