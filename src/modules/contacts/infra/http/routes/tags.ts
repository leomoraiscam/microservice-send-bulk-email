import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import CreateTagController from '@modules/contacts/infra/http/controllers/CreateTagController';
import ListTagsController from '@modules/contacts/infra/http/controllers/ListTagsController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { can, is } from '@shared/infra/http/middlewares/ensurePermission';

const createTagController = new CreateTagController();
const listTagsController = new ListTagsController();

const tagRouter = Router();

tagRouter.get(
  '/',
  ensureAuthenticated,
  is(['admin', 'viewer', 'sender']),
  can(['list-data']),
  listTagsController.handle
);
tagRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      tags: Joi.array().items({
        title: Joi.string().required(),
      }),
    },
  }),
  ensureAuthenticated,
  is(['admin']),
  can(['create-subscription']),
  createTagController.handle
);

export default tagRouter;
