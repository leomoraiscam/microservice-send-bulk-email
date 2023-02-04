import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import CreatePermissionController from '@modules/accessControlList/infra/http/controller/CreatePermissionController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

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
  createPermissionController.handle
);

export default permissionRouter;
