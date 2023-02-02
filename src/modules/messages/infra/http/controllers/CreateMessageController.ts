import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateMessageService from '@modules/messages/services/CreateMessageService';

class CreateMessageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { subject, body } = request.body;

    const createMessage = container.resolve(CreateMessageService);

    const message = await createMessage.execute({ body, subject });

    return response.status(201).json(message);
  }
}

export default CreateMessageController;
