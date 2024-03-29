import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';

import upload from '@config/upload';
import ChangeContactSubscriptionStatusController from '@modules/contacts/infra/http/controllers/ChangeContactSubscriptionStatusController';
import CreateTagsToContactController from '@modules/contacts/infra/http/controllers/CreateTagsToContactController';
import ImportContactsController from '@modules/contacts/infra/http/controllers/ImportContactsController';
import ListContactsController from '@modules/contacts/infra/http/controllers/ListContactsController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { can, is } from '@shared/infra/http/middlewares/ensurePermission';

const importContactsController = new ImportContactsController();
const createTagsToContactController = new CreateTagsToContactController();
const changeContactSubscriptionStatusController =
  new ChangeContactSubscriptionStatusController();
const listContactsController = new ListContactsController();

const contactRouter = Router();
const uploadContacts = multer(upload.multer);

contactRouter.get(
  '/',
  ensureAuthenticated,
  // is(['admin', 'viewer', 'sender']),
  // can(['list-data']),
  listContactsController.handle
);
contactRouter.post(
  '/import',
  uploadContacts.single('file'),
  ensureAuthenticated,
  // is(['admin']),
  // can(['create-subscription']),
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
  ensureAuthenticated,
  // is(['admin']),
  // can(['create-subscription']),
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
  // is(['admin']),
  // can(['create-subscription']),
  changeContactSubscriptionStatusController.handle
);

export default contactRouter;
