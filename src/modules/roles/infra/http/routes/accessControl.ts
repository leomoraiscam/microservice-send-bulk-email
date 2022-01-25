import { Router } from 'express';

import CreateUserAccessControlListController from '@modules/roles/infra/http/controller/CreateUserAccessControlListController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const createUserAccessControlListController =
  new CreateUserAccessControlListController();

const userAclRoutes = Router();

userAclRoutes.post(
  '/users/acl',
  ensureAuthenticated,
  createUserAccessControlListController.handle
);

export default userAclRoutes;
