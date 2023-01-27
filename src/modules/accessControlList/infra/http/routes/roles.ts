import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import CreateRoleController from '@modules/accessControlList/infra/http/controller/CreateRoleController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { is } from '@shared/infra/http/middlewares/ensurePermission';

const createRoleController = new CreateRoleController();

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
  createRoleController.handle
);

export default rolesRoutes;
