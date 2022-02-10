import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateTagsService from '@modules/contacts/services/CreateTagsService';

class CreateTagsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { tags } = request.body;
    const { id } = request.user;

    const CreateTags = container.resolve(CreateTagsService);

    const createdTags = await CreateTags.execute({
      tags,
      user_id: id,
    });

    return response.status(201).json(createdTags);
  }
}

export default CreateTagsController;
