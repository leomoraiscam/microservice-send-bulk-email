import { Router } from 'express';

import ImportContactsController from '@modules/contacts/infra/http/controllers/ImportContactsController';

const importContactsController = new ImportContactsController();

const contactsRoutes = Router();

contactsRoutes.post('/import', importContactsController.handle);

export default contactsRoutes;
