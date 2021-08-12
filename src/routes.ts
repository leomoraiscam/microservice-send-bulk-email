import { Router } from 'express';

import SendMessageService from './services/SendMessageService';

const routes = Router();

routes.post('/messages', async (request, response) => {
  const sendMessage = new SendMessageService();

  await sendMessage.run();

  return response.json({ Ok: true });
});

export default routes;
