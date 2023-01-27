import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import CreatePermissionsRoleController from '@modules/accessControlList/infra/http/controller/CreatePermissionsRoleController';
import CreateUserAccessControlListController from '@modules/accessControlList/infra/http/controller/CreateUserAccessControlListController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const createUserAccessControlListController =
  new CreateUserAccessControlListController();
const createPermissionsRoleController = new CreatePermissionsRoleController();

const userAclRoutes = Router();

userAclRoutes.post(
  '/users/:user_id/acl',
  celebrate({
    [Segments.BODY]: {
      permissions: Joi.array().items(Joi.string().uuid()),
      roles: Joi.array().items(Joi.string().uuid()),
    },
  }),
  ensureAuthenticated,
  createUserAccessControlListController.handle
);

userAclRoutes.post(
  '/roles/:role_id/permissions',
  celebrate({
    [Segments.PARAMS]: {
      role_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      permissions: Joi.array().items(Joi.string().uuid()),
    },
  }),
  createPermissionsRoleController.handle
);
export default userAclRoutes;
