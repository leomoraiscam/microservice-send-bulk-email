import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import CreatePermissionsController from '@modules/accessControlList/infra/http/controller/CreatePermissionsController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const createPermissionsController = new CreatePermissionsController();

const permissionsRoutes = Router();

permissionsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  createPermissionsController.handle
);

export default permissionsRoutes;
