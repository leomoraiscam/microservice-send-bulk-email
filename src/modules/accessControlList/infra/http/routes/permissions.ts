import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import CreatePermissionController from '@modules/accessControlList/infra/http/controller/CreatePermissionController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { can, is } from '@shared/infra/http/middlewares/ensurePermission';

const createPermissionController = new CreatePermissionController();

const permissionRouter = Router();

permissionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  // is(['admin']),
  // can(['create-permission']),
  createPermissionController.handle
);

export default permissionRouter;
