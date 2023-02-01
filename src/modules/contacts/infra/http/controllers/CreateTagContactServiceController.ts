import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTagContactService from '../../../services/CreateTagContactService';

class CreateTagsContactController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: contact_id } = request.params;
    const { tag_ids } = request.body;

    const createTagContact = container.resolve(CreateTagContactService);

    const contactTags = await createTagContact.execute({
      contact_id,
      tag_ids,
    });

    return response.status(201).json(contactTags);
  }
}

export default CreateTagsContactController;
