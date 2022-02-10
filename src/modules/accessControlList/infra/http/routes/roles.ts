import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import RolesController from '@modules/accessControlList/infra/http/controller/RolesController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { is } from '@shared/infra/http/middlewares/ensurePermission';

const rolesController = new RolesController();

const rolesRoutes = Router();

rolesRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().valid('ADMIN', 'USER').required(),
      description: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  is(['admin']),
  rolesController.handle
);

export default rolesRoutes;
