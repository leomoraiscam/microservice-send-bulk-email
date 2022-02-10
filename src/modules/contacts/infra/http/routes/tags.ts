import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import CreateTagsController from '@modules/contacts/infra/http/controllers/CreateTagsController';
import ListTagsController from '@modules/contacts/infra/http/controllers/ListTagsController';

const createTagsController = new CreateTagsController();
const listTagsController = new ListTagsController();

const contactsRoutes = Router();

contactsRoutes.get('/', listTagsController.handle);
contactsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      tags: Joi.array().items({
        title: Joi.string().required(),
      }),
    },
  }),
  createTagsController.handle
);

export default contactsRoutes;
