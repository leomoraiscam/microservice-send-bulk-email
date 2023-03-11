import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import CreatePermissionsRoleController from '@modules/accessControlList/infra/http/controller/CreatePermissionsRoleController';
import CreateUserAccessControlListController from '@modules/accessControlList/infra/http/controller/CreateUserAccessControlListController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { can, is } from '@shared/infra/http/middlewares/ensurePermission';

const createUserAccessControlListController =
  new CreateUserAccessControlListController();
const createPermissionsRoleController = new CreatePermissionsRoleController();

const userAclRouteR = Router();

userAclRouteR.post(
  '/users/:user_id/acl',
  celebrate({
    [Segments.BODY]: {
      permissions: Joi.array().items(Joi.string().uuid()),
      roles: Joi.array().items(Joi.string().uuid()),
    },
  }),
  ensureAuthenticated,
  is(['admin']),
  can(['create-role', 'create-permission']),
  createUserAccessControlListController.handle
);

userAclRouteR.post(
  '/roles/:role_id/permissions',
  celebrate({
    [Segments.PARAMS]: {
      role_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      permissions: Joi.array().items(Joi.string().uuid()),
    },
  }),
  ensureAuthenticated,
  is(['admin']),
  can(['create-role', 'create-permission']),
  createPermissionsRoleController.handle
);

export default userAclRouteR;
