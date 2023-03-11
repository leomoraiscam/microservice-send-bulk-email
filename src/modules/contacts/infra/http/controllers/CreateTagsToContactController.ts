import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTagsToContactService from '@modules/contacts/services/CreateTagsToContactService';

class CreateTagsToContactController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { contact_id } = request.params;
    const { tag_ids } = request.body;

    const createTagContact = container.resolve(CreateTagsToContactService);

    const tagsContact = await createTagContact.execute({
      contact_id,
      tag_ids,
    });

    return response.status(201).json(tagsContact);
  }
}

export default CreateTagsToContactController;
