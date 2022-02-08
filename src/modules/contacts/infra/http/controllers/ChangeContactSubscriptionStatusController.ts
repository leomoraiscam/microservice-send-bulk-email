import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ChangeContactSubscriptionStatusService from '../../../services/ChangeContactSubscriptionStatusService';

class ChangeContactSubscriptionStatusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { subscribed } = request.body;

    const changeContactSubscriptionStatus = container.resolve(
      ChangeContactSubscriptionStatusService
    );

    const contact = await changeContactSubscriptionStatus.execute({
      contact_id: id,
      subscribed,
    });

    return response.status(201).json(contact);
  }
}

export default ChangeContactSubscriptionStatusController;
