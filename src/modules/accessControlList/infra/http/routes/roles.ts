import { Router } from 'express';

import RolesController from '@modules/accessControlList/infra/http/controller/RolesController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { is } from '@shared/infra/http/middlewares/ensurePermission';

const rolesController = new RolesController();

const rolesRoutes = Router();

rolesRoutes.post(
  '/',
  ensureAuthenticated,
  is(['admin']),
  rolesController.handle
);

export default rolesRoutes;
