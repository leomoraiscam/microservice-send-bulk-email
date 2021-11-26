import { Response, Request } from 'express';
import { container } from 'tsyringe';

import ImportContactsService from '@modules/contacts/services/ImportContactsService';

class ImportContactsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { path } = request.file;

    const importContacts = container.resolve(ImportContactsService);

    await importContacts.execute(path);

    return response.status(201).send();
  }
}

export default ImportContactsController;
