import { Router } from 'express';

import CreateTagsController from '@modules/contacts/infra/http/controllers/CreateTagsController';

const createTagsController = new CreateTagsController();

const contactsRoutes = Router();

contactsRoutes.post('/', createTagsController.handle);

export default contactsRoutes;
