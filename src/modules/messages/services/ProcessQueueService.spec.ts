import ContactsRepositoryInMemory from '@modules/contacts/repositories/in-memory/ContactsRepositoryInMemory';
import TagsRepositoryInMemory from '@modules/contacts/repositories/in-memory/TagsRepositoryInMemory';
import MessageRepositoryInMemory from '@modules/messages/repositories/in-memory/MessagesRepositoryInMemory';
import MailProviderInMemory from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import QueueProviderInMemory from '@shared/container/providers/QueueProvider/in-memory/QueueProviderInMemory';

import ProcessQueueService from './ProcessQueueService';

let tagsRepositoryInMemory: TagsRepositoryInMemory;
let contactsRepositoryInMemory: ContactsRepositoryInMemory;
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

    tagsRepositoryInMemory = new TagsRepositoryInMemory();
    messageRepositoryInMemory = new MessageRepositoryInMemory();
    contactsRepositoryInMemory = new ContactsRepositoryInMemory();
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

    const tags = await tagsRepositoryInMemory.create([
      { title: 'Students' },
      { title: 'Class A' },
      { title: 'Class B' },
    ]);

    const contacts = [{ email: 'email@email.com' }];

    const contact = await contactsRepositoryInMemory.create(contacts[0].email);

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
