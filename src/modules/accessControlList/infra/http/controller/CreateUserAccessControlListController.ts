import { Response, Request } from 'express';
import { container } from 'tsyringe';

import createUserAccessControlListService from '@modules/accessControlList/services/CreateUserAccessControlListService';

class CreateUserAccessControlListController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { permissions, roles } = request.body;
    const { id } = request.user;

    const createUserACL = container.resolve(createUserAccessControlListService);

    const createdACL = await createUserACL.execute({
      user_id: id,
      permissions,
      roles,
    });

    return response.status(201).json(createdACL);
  }
}

export default CreateUserAccessControlListController;
