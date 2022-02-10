import { Router } from 'express';

import CreateTemplateController from '@modules/messages/infra/http/controllers/CreateTemplateController';
import ListTemplatesController from '@modules/messages/infra/http/controllers/ListTemplatesController';

const templatesRoutes = Router();

const createTemplateController = new CreateTemplateController();
const listTemplatesController = new ListTemplatesController();

templatesRoutes.post('/', createTemplateController.handle);
templatesRoutes.get('/', listTemplatesController.handle);

export default templatesRoutes;
