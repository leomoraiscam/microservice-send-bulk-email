import { Router } from 'express';
import fs from 'fs';
import path from 'path';

import ImportContactsService from '@modules/contacts/services/ImportContactsService';
import CreateMessageService from '@modules/messages/services/CreateMessageService';

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
