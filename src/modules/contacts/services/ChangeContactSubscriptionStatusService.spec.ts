import InMemoryContactsRepository from '@modules/contacts/repositories/in-memory/InMemoryContactsRepository';
import AppError from '@shared/errors/AppError';

import ChangeContactSubscriptionStatusService from './ChangeContactSubscriptionStatusService';

let changeContactSubscriptionStatusService: ChangeContactSubscriptionStatusService;
let inMemoryContactsRepository: InMemoryContactsRepository;

describe('Create Tag Contacts', () => {
  beforeEach(() => {
    inMemoryContactsRepository = new InMemoryContactsRepository();
    changeContactSubscriptionStatusService =
      new ChangeContactSubscriptionStatusService(inMemoryContactsRepository);
  });

  it('should be able to change status of contacts', async () => {
    const email = 'lmorais@gmail.com';

    const contact = await inMemoryContactsRepository.create({
      email,
      subscribed: true,
    });

    const contactChanged = await changeContactSubscriptionStatusService.execute(
      {
        contact_id: contact.id,
        subscribed: false,
      }
    );

    expect(contactChanged.subscribed).toBeFalsy();
  });

  it('should not be able to change the status when the contact non-exist', async () => {
    const contact_id = '123';

    await expect(
      changeContactSubscriptionStatusService.execute({
        contact_id,
        subscribed: true,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
