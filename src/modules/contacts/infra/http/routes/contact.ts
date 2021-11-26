import { Router } from 'express';
import multer from 'multer';

import upload from '@config/upload';
import CreateTagContactServiceController from '@modules/contacts/infra/http/controllers/CreateTagContactServiceController';
import ImportContactsController from '@modules/contacts/infra/http/controllers/ImportContactsController';

const importContactsController = new ImportContactsController();
const createTagContactServiceController =
  new CreateTagContactServiceController();

const contactsRoutes = Router();
const uploadContacts = multer(upload.multer);

contactsRoutes.post(
  '/import',
  uploadContacts.single('file'),
  importContactsController.handle
);
contactsRoutes.post('/tags/:id', createTagContactServiceController.handle);

export default contactsRoutes;
