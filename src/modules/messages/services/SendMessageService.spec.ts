import { v4 as uuidv4 } from 'uuid';

import Tag from '@modules/contacts/infra/typeorm/entities/Tag';
import InMemoryContactsRepository from '@modules/contacts/repositories/in-memory/InMemoryContactsRepository';
import InMemoryMessagesRepository from '@modules/messages/repositories/in-memory/InMemoryMessagesRepository';
import AppError from '@shared/errors/AppError';

import SendMessageService from './SendMessageService';

describe('SendMessageService', () => {
  let inMemoryContactsRepository: InMemoryContactsRepository;
  let inMemoryMessagesRepository: InMemoryMessagesRepository;
  let sendMessageService: SendMessageService;
  let defaultTags: Tag[];
  let tertiaryTags: Tag[];
  let mockQueue;
  let mockLogger;

  beforeEach(() => {
    mockQueue = {
      add: jest.fn(),
    };

    mockLogger = {
      log: jest.fn(),
    };

    inMemoryContactsRepository = new InMemoryContactsRepository();
    inMemoryMessagesRepository = new InMemoryMessagesRepository();
    sendMessageService = new SendMessageService(
      inMemoryMessagesRepository,
      inMemoryContactsRepository,
      mockQueue,
      mockLogger
    );

    defaultTags = [
      {
        id: uuidv4(),
        title: 'Students',
        created_at: new Date(),
        updated_at: new Date(),
        user_id: uuidv4(),
      },
      {
        id: uuidv4(),
        title: 'Class A',
        created_at: new Date(),
        updated_at: new Date(),
        user_id: uuidv4(),
      },
    ];

    tertiaryTags = [
      {
        title: 'Class B',
        id: uuidv4(),
        created_at: new Date(),
        updated_at: new Date(),
        user_id: uuidv4(),
      },
    ];
  });

  it('should be able to send message to users with existent tags', async () => {
    const [firstContact, secondContact, tertiaryContact] = await Promise.all([
      await inMemoryContactsRepository.create({
        email: 'raok@vicur.gov',
        subscribed: true,
      }),
      await inMemoryContactsRepository.create({
        email: 'ijcahe@ciku.md',
        subscribed: true,
      }),
      await inMemoryContactsRepository.create({
        email: 'je@lij.kw',
        subscribed: true,
      }),
    ]);

    firstContact.tags = defaultTags;
    secondContact.tags = defaultTags;
    tertiaryContact.tags = tertiaryTags;

    const [{ id: firstTagId }, { id: secondTagId }] = defaultTags;

    const tag_ids = [firstTagId, secondTagId];

    const message = await inMemoryMessagesRepository.create({
      subject: 'Hello Word',
      body: '<p>just testing the email</p>',
    });

    await sendMessageService.execute({ id: message.id, tags: tag_ids });

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
    const messageId = 'message-non-exist';

    await expect(
      sendMessageService.execute({
        id: messageId,
        tags: [],
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able send message when a non-exist recipients to this tags', async () => {
    const tags = ['first-tag-non-exist', 'second-tag-non-exist'];

    const message = await inMemoryMessagesRepository.create({
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
