import ChangeContactSubscriptionStatusService from '@modules/contacts/services/ChangeContactSubscriptionStatusService';

interface IKafkaHandler<T = any> {
  handle: (message: T) => Promise<void>;
}

interface IHandler {
  contact: {
    id: string;
  };
  subscribed: boolean;
}

class UpdateUserInfoHandler implements IKafkaHandler {
  constructor(
    private readonly changeContactSubscriptionStatusService: ChangeContactSubscriptionStatusService
  ) {}

  async handle({ contact, subscribed }: IHandler): Promise<void> {
    const result = await this.changeContactSubscriptionStatusService.execute({
      contact_id: contact.id,
      subscribed,
    });

    if (!result) {
      throw Error(
        'Kafka handler from integration ChangeContactSubscriptionStatusService error'
      );
    }
  }
}

export default UpdateUserInfoHandler;
