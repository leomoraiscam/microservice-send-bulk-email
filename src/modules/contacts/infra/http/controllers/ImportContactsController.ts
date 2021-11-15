import { Response, Request } from 'express';
import fs from 'fs';
import path from 'path';
import { container } from 'tsyringe';

import ImportContactsService from '@modules/contacts/services/ImportContactsService';

class ImportContactsController {
  async handle(request: Request, response: Response): Promise<Response> {
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

    const importContacts = container.resolve(ImportContactsService);

    await importContacts.execute(contactsReadStream, tags);

    return response.send();
  }
}

export default ImportContactsController;
