import { Router } from 'express';

import CreateMessageController from '@modules/messages/infra/http/controllers/CreateMessageController';

const messagesRoutes = Router();

const createMessageController = new CreateMessageController();

messagesRoutes.post('/', createMessageController.handle);

export default messagesRoutes;
