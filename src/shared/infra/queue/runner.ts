import 'dotenv/config';
import MailQueue from '@config/redis';
import SendMessageToRecipientService from '@modules/messages/services/SendMessageToRecipientService';

MailQueue.process(async () => {
  const sendMessageToRecipient = new SendMessageToRecipientService();

  await sendMessageToRecipient.execute();
});
