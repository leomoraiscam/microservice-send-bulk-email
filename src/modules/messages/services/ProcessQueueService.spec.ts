import InMemoryContactsRepository from '@modules/contacts/repositories/in-memory/InMemoryContactsRepository';
import InMemoryTagsRepository from '@modules/contacts/repositories/in-memory/InMemoryTagsRepository';
import InMemoryMessagesRepository from '@modules/messages/repositories/in-memory/InMemoryMessagesRepository';
import MailProviderInMemory from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import QueueProviderInMemory from '@shared/container/providers/QueueProvider/in-memory/QueueProviderInMemory';

import ProcessQueueService from './ProcessQueueService';

describe('ProcessQueueService', () => {
  let inMemoryContactsRepository: InMemoryContactsRepository;
  let inMemoryTagsRepository: InMemoryTagsRepository;
  let inMemoryMessagesRepository: InMemoryMessagesRepository;
  let mailProviderInMemory: MailProviderInMemory;
  let queueProviderInMemory: QueueProviderInMemory;
  let processQueueService: ProcessQueueService;
  let mockLogger;

  beforeEach(() => {
    mockLogger = {
      log: jest.fn(),
    };

    inMemoryContactsRepository = new InMemoryContactsRepository();
    inMemoryTagsRepository = new InMemoryTagsRepository();
    inMemoryMessagesRepository = new InMemoryMessagesRepository();
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

    const contact = await inMemoryContactsRepository.create({
      email: 'sugeccub@pehlac.lv',
      subscribed: true,
    });

    const tags = await inMemoryTagsRepository.create({
      tags: [{ title: 'Students' }, { title: 'Class A' }, { title: 'Class B' }],
      contact_id: contact.id,
    });

    const message = await inMemoryMessagesRepository.create({
      subject: 'Message',
      body: 'I hope this message gets delivered!',
    });

    contact.tags = tags;

    const { data: dataToProcessInQueue } = {
      data: {
        contact,
        message,
      },
    };

    queueProviderInMemory.add(dataToProcessInQueue);

    await processQueueService.execute();

    expect(sendMail).toHaveBeenCalledWith({
      to: {
        email: contact.email,
      },
      subject: message.subject,
      text: message.body,
    });
  });
});
