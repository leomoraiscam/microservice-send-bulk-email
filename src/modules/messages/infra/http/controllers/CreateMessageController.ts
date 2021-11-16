import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateMessageService from '@modules/messages/services/CreateMessageService';

class CreateMessageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { subject, body, tags } = request.body;

    const createMessage = container.resolve(CreateMessageService);

    const messageData = { subject, body };

    const message = await createMessage.execute(messageData, tags);

    return response.status(201).json(message);
  }
}

export default CreateMessageController;
