import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ChangeContactSubscriptionStatusService from '@modules/contacts/services/ChangeContactSubscriptionStatusService';

class ChangeContactSubscriptionStatusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: contact_id } = request.params;
    const { subscribed } = request.body;

    const changeContactSubscriptionStatus = container.resolve(
      ChangeContactSubscriptionStatusService
    );

    await changeContactSubscriptionStatus.execute({
      contact_id,
      subscribed,
    });

    return response.status(204).send();
  }
}

export default ChangeContactSubscriptionStatusController;
