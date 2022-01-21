import { Router } from 'express';

import RolesController from '@modules/roles/infra/http/controller/RolesController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const rolesController = new RolesController();

const rolesRoutes = Router();

rolesRoutes.post('/', ensureAuthenticated, rolesController.handle);

export default rolesRoutes;
