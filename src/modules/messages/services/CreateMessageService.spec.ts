import MessagesRepositoryInMemory from '@modules/messages/repositories/in-memory/MessagesRepositoryInMemory';

import SendMessageService from './CreateMessageService';

let messagesRepositoryInMemory: MessagesRepositoryInMemory;
let sendMessageService: SendMessageService;

describe('Send Message', () => {
  beforeEach(async () => {
    messagesRepositoryInMemory = new MessagesRepositoryInMemory();
    sendMessageService = new SendMessageService(messagesRepositoryInMemory);
  });

  it('should not be able to create new message', async () => {
    const messageData = {
      subject: 'Hello Word',
      body: '<p>just testing the email</p>',
    };

    const message = await sendMessageService.execute({ messageData });

    expect(message).toHaveProperty('id');
  });
});
