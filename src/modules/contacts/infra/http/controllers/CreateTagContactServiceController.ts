import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTagContactService from '../../../services/CreateTagContactService';

class CreateTagsContactController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { tags_ids } = request.body;

    const createTagContact = container.resolve(CreateTagContactService);

    const tagsContact = await createTagContact.execute({
      contact_id: id,
      tags_ids,
    });

    return response.status(201).json(tagsContact);
  }
}

export default CreateTagsContactController;
