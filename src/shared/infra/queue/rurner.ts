import 'dotenv/config';
import SendMessageToRecipientService from './services/SendMessageToRecipientService';
import MailQueue from './shared/infra/queue/MailQueue';

MailQueue.process(async () => {
  const sendMessageToRecipient = new SendMessageToRecipientService();

  await sendMessageToRecipient.run();
});
