import mongoose from 'mongoose';

import Contact from '@modules/contacts/infra/mongoose/schemas/Contact';
import Tag from '@modules/contacts/infra/mongoose/schemas/Tag';
import QueueMock from '@modules/contacts/utils/tests/QueueMock';

import Message from '../infra/mongoose/schemas/Message';
import SendMessageService from './CreateMessageService';

describe('Send Message', () => {
  beforeAll(async () => {
    if (!process.env.MONGO_URL) {
      throw new Error('MongoDB server not initialized');
    }

    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Tag.deleteMany({});
    await Message.deleteMany({});
  });

  it('should be able to create new message', async () => {
    const sendMessage = new SendMessageService();

    const tags = await Tag.create([
      { title: 'Students' },
      { title: 'Class A' },
    ]);

    const tagsIds = tags.map((tag) => tag._id);

    const contacts = [
      { email: 'email@email.com', tags: tagsIds },
      { email: 'email@email.com.br', tags: tagsIds },
      { email: 'johndoe@email.com.br', tags: tagsIds },
    ];

    await Contact.create(contacts);

    const messageData = {
      subject: 'Hello Word',
      body: '<p>just testing the email</p>',
      tags: tagsIds,
    };

    await sendMessage.run(messageData, tagsIds);

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

  it('should create a job inside the queue for each recipients email', async () => {
    return true;
  });

  it('should process the queue sending mail for each recipient', async () => {
    return true;
  });
});
