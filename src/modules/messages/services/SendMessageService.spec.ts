import ContactsRepositoryInMemory from '@modules/contacts/repositories/in-memory/ContactsRepositoryInMemory';
import TagsRepositoryInMemory from '@modules/contacts/repositories/in-memory/TagsRepositoryInMemory';
import MessageRepositoryInMemory from '@modules/messages/repositories/in-memory/MessagesRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import SendMessageService from './SendMessageService';

let contactsRepositoryInMemory: ContactsRepositoryInMemory;
let messageRepositoryInMemory: MessageRepositoryInMemory;
let tagsRepositoryInMemory: TagsRepositoryInMemory;
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

    contactsRepositoryInMemory = new ContactsRepositoryInMemory();
    messageRepositoryInMemory = new MessageRepositoryInMemory();
    tagsRepositoryInMemory = new TagsRepositoryInMemory();
    sendMessageService = new SendMessageService(
      messageRepositoryInMemory,
      contactsRepositoryInMemory,
      mockQueue,
      mockLogger
    );
  });

  it('should be able to send message to users with existent tags', async () => {
    const tags = await tagsRepositoryInMemory.create([
      { title: 'Students' },
      { title: 'Class A' },
      { title: 'Class B' },
    ]);

    const [t1, t2, t3] = tags;

    const tagsIds = tags.map((tag) => tag.id);

    const [id1, id2] = tagsIds;

    const contacts = [
      { email: 'email@email.com' },
      { email: 'email@email.com.br' },
      { email: 'johndoe@email.com.br' },
    ];

    const [firstContact, secondContact, tertiaryContact] = await Promise.all([
      await contactsRepositoryInMemory.create(contacts[0].email),
      await contactsRepositoryInMemory.create(contacts[1].email),
      await contactsRepositoryInMemory.create(contacts[2].email),
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
});
