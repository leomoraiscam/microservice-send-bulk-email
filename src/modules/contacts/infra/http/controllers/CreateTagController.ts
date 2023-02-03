import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateTagsService from '@modules/contacts/services/CreateTagService';

class CreateTagController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: contact_id } = request.user;
    const { tags } = request.body;

    const createTags = container.resolve(CreateTagsService);

    const createdTags = await createTags.execute({
      tags,
      contact_id,
    });

    return response.status(201).json(createdTags);
  }
}

export default CreateTagController;
