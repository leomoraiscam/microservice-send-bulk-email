import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';

import upload from '@config/upload';
import ChangeContactSubscriptionStatusController from '@modules/contacts/infra/http/controllers/ChangeContactSubscriptionStatusController';
import CreateTagsToContactController from '@modules/contacts/infra/http/controllers/CreateTagsToContactController';
import ImportContactsController from '@modules/contacts/infra/http/controllers/ImportContactsController';
import ListContactsController from '@modules/contacts/infra/http/controllers/ListContactsController';

const importContactsController = new ImportContactsController();
const createTagsToContactController = new CreateTagsToContactController();
const changeContactSubscriptionStatusController =
  new ChangeContactSubscriptionStatusController();
const listContactsController = new ListContactsController();

const contactRouter = Router();
const uploadContacts = multer(upload.multer);

contactRouter.get('/', listContactsController.handle);
contactRouter.post(
  '/import',
  uploadContacts.single('file'),
  importContactsController.handle
);
contactRouter.post(
  '/:contact_id/tags',
  celebrate({
    [Segments.PARAMS]: {
      contact_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      tag_ids: Joi.array().items(Joi.string()),
    },
  }),
  createTagsToContactController.handle
);
contactRouter.patch(
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

export default contactRouter;
