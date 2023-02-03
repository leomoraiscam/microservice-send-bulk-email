import InMemoryContactsRepository from '@modules/contacts/repositories/in-memory/InMemoryContactsRepository';
import AppError from '@shared/errors/AppError';

import ChangeContactSubscriptionStatusService from './ChangeContactSubscriptionStatusService';

describe('ChangeContactSubscriptionStatusService', () => {
  let changeContactSubscriptionStatusService: ChangeContactSubscriptionStatusService;
  let inMemoryContactsRepository: InMemoryContactsRepository;

  beforeEach(() => {
    inMemoryContactsRepository = new InMemoryContactsRepository();
    changeContactSubscriptionStatusService =
      new ChangeContactSubscriptionStatusService(inMemoryContactsRepository);
  });

  it('should be able to change status of specific contact', async () => {
    const { id } = await inMemoryContactsRepository.create({
      email: 'ugivapzo@uvo.so',
      subscribed: true,
    });

    const { subscribed } = await changeContactSubscriptionStatusService.execute(
      {
        contact_id: id,
        subscribed: false,
      }
    );

    expect(subscribed).toBeFalsy();
  });

  it('should not be able to change the status when the receive contact non-exist', async () => {
    await expect(
      changeContactSubscriptionStatusService.execute({
        contact_id: 'id-non-exist',
        subscribed: true,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
