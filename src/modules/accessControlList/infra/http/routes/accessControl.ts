import { Router } from 'express';

import CreateRolePermissionController from '@modules/accessControlList/infra/http/controller/CreateRolePermissionController';
import CreateUserAccessControlListController from '@modules/accessControlList/infra/http/controller/CreateUserAccessControlListController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const createUserAccessControlListController =
  new CreateUserAccessControlListController();
const createRolePermissionController = new CreateRolePermissionController();

const userAclRoutes = Router();

userAclRoutes.post(
  '/users/acl',
  ensureAuthenticated,
  createUserAccessControlListController.handle
);

userAclRoutes.post(
  '/roles/:role_id/permissions',
  createRolePermissionController.handle
);
export default userAclRoutes;
