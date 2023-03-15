import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import CreateTemplateController from '@modules/messages/infra/http/controllers/CreateTemplateController';
import ListTemplatesController from '@modules/messages/infra/http/controllers/ListTemplatesController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { can, is } from '@shared/infra/http/middlewares/ensurePermission';

const templateRouter = Router();

const createTemplateController = new CreateTemplateController();
const listTemplatesController = new ListTemplatesController();

templateRouter.get(
  '/',
  // is(['admin', 'sender', 'viewer']),
  // can(['list-data']),
  listTemplatesController.handle
);
templateRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      content: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  // is(['admin']),
  // can(['create-broadcast']),
  createTemplateController.handle
);

export default templateRouter;
