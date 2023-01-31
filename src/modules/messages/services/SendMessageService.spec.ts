import InMemoryContactsRepository from '@modules/contacts/repositories/in-memory/InMemoryContactsRepository';
import InMemoryTagsRepository from '@modules/contacts/repositories/in-memory/InMemoryTagsRepository';
import MessageRepositoryInMemory from '@modules/messages/repositories/in-memory/MessagesRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import SendMessageService from './SendMessageService';

let inMemoryContactsRepository: InMemoryContactsRepository;
let messageRepositoryInMemory: MessageRepositoryInMemory;
let inMemoryTagsRepository: InMemoryTagsRepository;
let sendMessageService: SendMessageService;
let mockQueue;
let mockLogger;

describe('Send Message', () => {
  beforeEach(() => {
    mockQueue = {
      add: jest.fn(),
    };

    mockLogger = {
      log: jest.fn(),
    };

    inMemoryContactsRepository = new InMemoryContactsRepository();
    messageRepositoryInMemory = new MessageRepositoryInMemory();
    inMemoryTagsRepository = new InMemoryTagsRepository();
    sendMessageService = new SendMessageService(
      messageRepositoryInMemory,
      inMemoryContactsRepository,
      mockQueue,
      mockLogger
    );
  });

  it('should be able to send message to users with existent tags', async () => {
    const tags = await inMemoryTagsRepository.create({
      tags: [{ title: 'Students' }, { title: 'Class A' }, { title: 'Class B' }],
      user_id: null,
    });

    const [t1, t2, t3] = tags;

    const tagsIds = tags.map((tag) => tag.id);

    const [id1, id2] = tagsIds;

    const contacts = [
      { email: 'email@email.com' },
      { email: 'email@email.com.br' },
      { email: 'johndoe@email.com.br' },
    ];

    const [firstContact, secondContact, tertiaryContact] = await Promise.all([
      await inMemoryContactsRepository.create({
        email: contacts[0].email,
        subscribed: true,
      }),
      await inMemoryContactsRepository.create({
        email: contacts[1].email,
        subscribed: true,
      }),
      await inMemoryContactsRepository.create({
        email: contacts[2].email,
        subscribed: true,
      }),
    ]);

    const arrayConcat = [t1].concat([t2]);

    firstContact.tags = arrayConcat;
    secondContact.tags = arrayConcat;
    tertiaryContact.tags = [t3];

    const tagsSearch = [id1, id2];

    const message = await messageRepositoryInMemory.create({
      subject: 'Hello Word',
      body: '<p>just testing the email</p>',
    });

    const { id } = message;

    await sendMessageService.execute({ id, tags: tagsSearch });

    const dataJob = [
      {
        contact: firstContact,
        message,
      },
      {
        contact: secondContact,
        message,
      },
    ];

    expect(mockQueue.add).toHaveBeenCalledWith(dataJob);
  });

  it('should not be able send message when a the same a non-exist', async () => {
    const messageId = '1234';

    await expect(
      sendMessageService.execute({
        id: messageId,
        tags: [],
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able send message when a non-exist recipients to this tags', async () => {
    const tags = ['1234', '5678'];

    const message = await messageRepositoryInMemory.create({
      subject: 'Hello Word',
      body: '<p>just testing the email</p>',
    });

    await expect(
      sendMessageService.execute({
        id: message.id,
        tags,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
