import Contact from '../schemas/Contact';
import Message, { MessageModel } from '../schemas/Message';
import MailQueue from '../shared/infra/queue/MailQueue';

class SendMessageService {
  async run(
    messageData: {
      subject: string;
      body: string;
    },
    tags: string[]
  ): Promise<MessageModel> {
    const message = await Message.create(messageData);

    const recipients = await Contact.find({
      tags: {
        $in: tags,
      },
    });

    await Promise.all(
      recipients.map((recipient) => {
        return MailQueue.add({
          to: recipient.email,
          messageData,
        });
      })
    );

    return message;
  }
}

export default SendMessageService;
