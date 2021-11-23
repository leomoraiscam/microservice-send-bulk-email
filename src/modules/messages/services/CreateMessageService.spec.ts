import ContactsRepositoryInMemory from '@modules/contacts/repositories/in-memory/ContactsRepositoryInMemory';
import TagsRepositoryInMemory from '@modules/contacts/repositories/in-memory/TagsRepositoryInMemory';
import QueueMock from '@modules/contacts/utils/tests/QueueMock';
import MessagesRepositoryInMemory from '@modules/messages/repositories/in-memory/MessagesRepositoryInMemory';

import SendMessageService from './CreateMessageService';

let contactsRepositoryInMemory: ContactsRepositoryInMemory;
let tagsRepositoryInMemory: TagsRepositoryInMemory;
let messagesRepositoryInMemory: MessagesRepositoryInMemory;
let sendMessageService: SendMessageService;

describe('Send Message', () => {
  beforeEach(async () => {
    contactsRepositoryInMemory = new ContactsRepositoryInMemory();
    tagsRepositoryInMemory = new TagsRepositoryInMemory();
    messagesRepositoryInMemory = new MessagesRepositoryInMemory();
    sendMessageService = new SendMessageService(
      messagesRepositoryInMemory,
      contactsRepositoryInMemory
    );
  });

  it('should be able to create new message to specific contacts', async () => {
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

    const messageData = {
      subject: 'Hello Word',
      body: '<p>just testing the email</p>',
    };

    const tagsSearch = [id1, id2];

    await sendMessageService.execute({ messageData, tags: tagsSearch });

    expect(QueueMock.add).toHaveBeenCalledWith({
      to: contacts[0].email,
      messageData,
    });

    expect(QueueMock.add).toHaveBeenCalledWith({
      to: contacts[1].email,
      messageData,
    });
  });

  it('should be able to create new message to all contacts', async () => {
    const tags = await tagsRepositoryInMemory.create([
      { title: 'Students' },
      { title: 'Class A' },
      { title: 'Class B' },
    ]);

    const tagsIds = tags.map((tag) => tag.id);

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

    firstContact.tags = tags;
    secondContact.tags = tags;
    tertiaryContact.tags = tags;

    const messageData = {
      subject: 'Hello Word',
      body: '<p>just testing the email</p>',
    };

    await sendMessageService.execute({ messageData, tags: tagsIds });

    expect(QueueMock.add).toHaveBeenCalledWith({
      to: contacts[0].email,
      messageData,
    });

    expect(QueueMock.add).toHaveBeenCalledWith({
      to: contacts[1].email,
      messageData,
    });

    expect(QueueMock.add).toHaveBeenCalledWith({
      to: contacts[2].email,
      messageData,
    });
  });
});
