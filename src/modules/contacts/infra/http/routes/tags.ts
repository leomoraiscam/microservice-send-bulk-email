import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import CreateTagController from '@modules/contacts/infra/http/controllers/CreateTagController';
import ListTagsController from '@modules/contacts/infra/http/controllers/ListTagsController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const createTagController = new CreateTagController();
const listTagsController = new ListTagsController();

const tagRouter = Router();

tagRouter.get('/', listTagsController.handle);
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
  createTagController.handle
);

export default tagRouter;
