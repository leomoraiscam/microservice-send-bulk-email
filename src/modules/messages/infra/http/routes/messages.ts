import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import CreateMessageController from '@modules/messages/infra/http/controllers/CreateMessageController';
import SendMessageController from '@modules/messages/infra/http/controllers/SendMessageController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import can from '@shared/infra/http/middlewares/ensurePermission';

const messageRouter = Router();

const createMessageController = new CreateMessageController();
const sendMessageController = new SendMessageController();

messageRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      subject: Joi.string().required(),
      body: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  can(['send_mail']),
  createMessageController.handle
);
messageRouter.post(
  '/:id/send',
  celebrate({
    [Segments.BODY]: {
      tags: Joi.array().items(Joi.string().uuid().required()),
    },
  }),
  sendMessageController.handle
);

export default messageRouter;
