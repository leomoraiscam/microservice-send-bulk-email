import MailQueue from '@config/redis';
import Contact from '@modules/contacts/infra/mongoose/schemas/Contact';

import Message, { MessageModel } from '../infra/mongoose/schemas/Message';

class SendMessageService {
  async execute(
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
