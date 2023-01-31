import InMemoryContactsRepository from '@modules/contacts/repositories/in-memory/InMemoryContactsRepository';
import InMemoryTagsRepository from '@modules/contacts/repositories/in-memory/InMemoryTagsRepository';
import MessageRepositoryInMemory from '@modules/messages/repositories/in-memory/MessagesRepositoryInMemory';
import MailProviderInMemory from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import QueueProviderInMemory from '@shared/container/providers/QueueProvider/in-memory/QueueProviderInMemory';

import ProcessQueueService from './ProcessQueueService';

let inMemoryTagsRepository: InMemoryTagsRepository;
let inMemoryContactsRepository: InMemoryContactsRepository;
let messageRepositoryInMemory: MessageRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;
let queueProviderInMemory: QueueProviderInMemory;
let processQueueService: ProcessQueueService;

let mockLogger;

describe('Process Queue', () => {
  beforeEach(() => {
    mockLogger = {
      log: jest.fn(),
    };

    inMemoryTagsRepository = new InMemoryTagsRepository();
    messageRepositoryInMemory = new MessageRepositoryInMemory();
    inMemoryContactsRepository = new InMemoryContactsRepository();
    mailProviderInMemory = new MailProviderInMemory();
    queueProviderInMemory = new QueueProviderInMemory();

    processQueueService = new ProcessQueueService(
      queueProviderInMemory,
      mockLogger,
      mailProviderInMemory
    );
  });

  it('should send message to all recipients when processing the queue', async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, 'sendMail');

    const tags = await inMemoryTagsRepository.create({
      tags: [{ title: 'Students' }, { title: 'Class A' }, { title: 'Class B' }],
      user_id: null,
    });

    const contacts = [{ email: 'email@email.com' }];

    const contact = await inMemoryContactsRepository.create({
      email: contacts[0].email,
      subscribed: true,
    });

    contact.tags = tags;

    const message = await messageRepositoryInMemory.create({
      subject: 'Message',
      body: 'I hope this message gets delivered!',
    });

    const jobs = {
      data: {
        contact,
        message,
      },
    };

    queueProviderInMemory.add(jobs.data);

    await processQueueService.execute();

    expect(sendMail).toHaveBeenCalledWith({
      from: 'sender@example.com',
      to: contact.email,
      subject: message.subject,
      text: message.body,
    });
  });
});
