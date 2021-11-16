import { Router } from 'express';

import CreateTagContactServiceController from '@modules/contacts/infra/http/controllers/CreateTagContactServiceController';
import ImportContactsController from '@modules/contacts/infra/http/controllers/ImportContactsController';

const importContactsController = new ImportContactsController();
const createTagContactServiceController =
  new CreateTagContactServiceController();

const contactsRoutes = Router();

contactsRoutes.post('/import', importContactsController.handle);
contactsRoutes.post('/tags/:id', createTagContactServiceController.handle);

export default contactsRoutes;
