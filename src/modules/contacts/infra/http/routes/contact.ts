import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';

import upload from '@config/upload';
import ChangeContactSubscriptionStatusController from '@modules/contacts/infra/http/controllers/ChangeContactSubscriptionStatusController';
import CreateTagContactServiceController from '@modules/contacts/infra/http/controllers/CreateTagContactServiceController';
import ImportContactsController from '@modules/contacts/infra/http/controllers/ImportContactsController';
import ListContactsController from '@modules/contacts/infra/http/controllers/ListContactsController';

const importContactsController = new ImportContactsController();
const createTagContactServiceController =
  new CreateTagContactServiceController();
const changeContactSubscriptionStatusController =
  new ChangeContactSubscriptionStatusController();
const listContactsController = new ListContactsController();

const contactsRoutes = Router();
const uploadContacts = multer(upload.multer);

contactsRoutes.get('/', listContactsController.handle);
contactsRoutes.post(
  '/import',
  uploadContacts.single('file'),
  importContactsController.handle
);
contactsRoutes.post(
  '/tags/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      tags_ids: Joi.array().items(Joi.string()),
    },
  }),
  createTagContactServiceController.handle
);
contactsRoutes.patch(
  '/:contact_id/subscription',
  celebrate({
    [Segments.PARAMS]: {
      contact_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      subscribed: Joi.bool(),
    },
  }),
  changeContactSubscriptionStatusController.handle
);

export default contactsRoutes;
