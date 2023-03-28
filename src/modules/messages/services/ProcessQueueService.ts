import { inject, injectable } from 'tsyringe';

import IMessageJob from '@modules/messages/dtos/IMessageJobDTO';
import ILoggerProvider from '@shared/container/providers/LoggerProvider/models/ILoggerProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IQueueProvider from '@shared/container/providers/QueueProvider/models/IQueueProvider';

@injectable()
class ProcessQueueService {
  constructor(
    @inject('QueueProvider')
    private queueProvider: IQueueProvider,
    @inject('LoggerProvider')
    private loggerProvider: ILoggerProvider,
    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  async execute(): Promise<void> {
    this.queueProvider.process(async (job) => {
      const { contact, message } = job.data as IMessageJob;

      await this.mailProvider.sendMail({
        to: {
          email: contact.email,
        },
        subject: message.subject,
        text: message.body,
      });

      this.loggerProvider.log(
        'info',
        `[${message.subject}] Sent message to ${contact.email}`
      );
    });
  }
}

export default ProcessQueueService;
