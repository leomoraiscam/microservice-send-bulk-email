import InMemoryMessagesRepository from '@modules/messages/repositories/in-memory/InMemoryMessagesRepository';

import CreateMessageService from './CreateMessageService';

describe('CreateMessageService', () => {
  let inMemoryMessagesRepository: InMemoryMessagesRepository;
  let createMessageService: CreateMessageService;

  beforeEach(async () => {
    inMemoryMessagesRepository = new InMemoryMessagesRepository();
    createMessageService = new CreateMessageService(inMemoryMessagesRepository);
  });

  it('should be able to create new message when receive correct data', async () => {
    const message = await createMessageService.execute({
      subject: 'Hello Word',
      body: '<p>just testing the email</p>',
    });

    expect(message).toHaveProperty('id');
  });
});
