import { Router } from 'express';

import CreatePermissionsController from '@modules/roles/infra/http/controller/CreatePermissionsController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const createPermissionsController = new CreatePermissionsController();

const permissionsRoutes = Router();

permissionsRoutes.post(
  '/',
  ensureAuthenticated,
  createPermissionsController.handle
);

export default permissionsRoutes;
