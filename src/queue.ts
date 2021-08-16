import 'dotenv/config';
import MailQueue from './queues/MailQueue';
import SendMessageToRecipientService from './services/SendMessageToRecipientService';

MailQueue.process(async () => {
  const sendMessageToRecipient = new SendMessageToRecipientService();

  await sendMessageToRecipient.run();
});
