import { Router } from 'express';
import fs from 'fs';
import path from 'path';

import CreateMessageService from './services/CreateMessageService';
import ImportContactsService from './services/ImportContactsService';

const routes = Router();

routes.post('/contacts/import', async (request, response) => {
  const { tags } = request.body;

  const contactsReadStream = fs.createReadStream(
    path.resolve(__dirname, '..', 'tmp', 'contacts_mail.csv')
  );

  const importContacts = new ImportContactsService();

  await importContacts.run(contactsReadStream, tags);

  return response.send();
});

routes.post('/messages', async (request, response) => {
  const { subject, body, tags } = request.body;

  const createMessage = new CreateMessageService();

  const messageData = { subject, body };

  const message = await createMessage.run(messageData, tags);

  return response.json(message);
});

export default routes;
