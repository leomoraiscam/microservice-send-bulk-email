import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import CreateTemplateController from '@modules/messages/infra/http/controllers/CreateTemplateController';
import ListTemplatesController from '@modules/messages/infra/http/controllers/ListTemplatesController';

const templateRouter = Router();

const createTemplateController = new CreateTemplateController();
const listTemplatesController = new ListTemplatesController();

templateRouter.get('/', listTemplatesController.handle);
templateRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      content: Joi.string().required(),
    },
  }),
  createTemplateController.handle
);

export default templateRouter;
