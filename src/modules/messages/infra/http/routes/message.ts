import { Router } from 'express';

import CreateMessageController from '@modules/messages/infra/http/controllers/CreateMessageController';
import SendMessageController from '@modules/messages/infra/http/controllers/SendMessageController';

const messagesRoutes = Router();

const createMessageController = new CreateMessageController();
const sendMessageController = new SendMessageController();

messagesRoutes.post('/', createMessageController.handle);
messagesRoutes.post('/:id/send', sendMessageController.handle);

export default messagesRoutes;
