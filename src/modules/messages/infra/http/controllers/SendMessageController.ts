import { Response, Request } from 'express';
import { container } from 'tsyringe';

import SendMessageService from '@modules/messages/services/SendMessageService';

class SendMessageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { tags } = request.body;

    const sendMessage = container.resolve(SendMessageService);

    await sendMessage.execute({ id, tags });

    return response.status(201).send();
  }
}

export default SendMessageController;
