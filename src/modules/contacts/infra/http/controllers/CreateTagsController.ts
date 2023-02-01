import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateTagsService from '@modules/contacts/services/CreateTagService';

class CreateTagsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: contact_id } = request.user;
    const { tags } = request.body;

    const CreateTags = container.resolve(CreateTagsService);

    const createdTags = await CreateTags.execute({
      tags,
      contact_id,
    });

    return response.status(201).json(createdTags);
  }
}

export default CreateTagsController;
