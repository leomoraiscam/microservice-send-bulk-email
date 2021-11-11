import { Router } from 'express';
import fs from 'fs';
import path from 'path';

import ImportContactsService from '@modules/contacts/services/ImportContactsService';

const contactsRoutes = Router();

contactsRoutes.post('/import', async (request, response) => {
  const { tags } = request.body;

  const contactsReadStream = fs.createReadStream(
    path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      '..',
      '..',
      'tmp',
      'contacts_mail.csv'
    )
  );

  const importContacts = new ImportContactsService();

  await importContacts.run(contactsReadStream, tags);

  return response.send();
});

export default contactsRoutes;
