import { Router } from 'express';

import CreateMessageService from '@modules/messages/services/CreateMessageService';

const messagesRoutes = Router();

messagesRoutes.post('/', async (request, response) => {
  const { subject, body, tags } = request.body;

  const createMessage = new CreateMessageService();

  const messageData = { subject, body };

  const message = await createMessage.run(messageData, tags);

  return response.json(message);
});

export default messagesRoutes;
