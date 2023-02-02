import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTagsToContactService from '../../../services/CreateTagsToContactService';

class CreateTagsToContactController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: contact_id } = request.params;
    const { tag_ids } = request.body;

    const createTagContact = container.resolve(CreateTagsToContactService);

    const contactTags = await createTagContact.execute({
      contact_id,
      tag_ids,
    });

    return response.status(201).json(contactTags);
  }
}

export default CreateTagsToContactController;
