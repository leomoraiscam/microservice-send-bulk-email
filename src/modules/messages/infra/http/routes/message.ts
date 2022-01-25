import { Router } from 'express';

import CreateMessageController from '@modules/messages/infra/http/controllers/CreateMessageController';
import SendMessageController from '@modules/messages/infra/http/controllers/SendMessageController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import can from '@shared/infra/http/middlewares/ensurePermission';

const messagesRoutes = Router();

const createMessageController = new CreateMessageController();
const sendMessageController = new SendMessageController();

messagesRoutes.post(
  '/',
  ensureAuthenticated,
  can(['send_mail']),
  createMessageController.handle
);
messagesRoutes.post('/:id/send', sendMessageController.handle);

export default messagesRoutes;
