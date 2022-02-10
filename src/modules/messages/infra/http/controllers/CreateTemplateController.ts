import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateTemplateService from '@modules/messages/services/CreateTemplateService';

class CreateTemplateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, content } = request.body;

    const createTemplate = container.resolve(CreateTemplateService);

    const template = await createTemplate.execute({ title, content });

    return response.status(201).json(template);
  }
}

export default CreateTemplateController;
