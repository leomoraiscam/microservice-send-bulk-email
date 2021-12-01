import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';

import IQueueProvider from '@shared/container/providers/QueueProvider/models/IQueueProvider';

@injectable()
class ProcessQueueService {
  private transporter: Transporter;

  constructor(
    @inject('QueueProvider')
    private queueProvider: IQueueProvider
  ) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      secure: false,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });
  }

  async execute(): Promise<void> {
    this.queueProvider.process(async (job) => {
      await this.transporter.sendMail({
        from: 'sender@example.com',
        to: 'equipe@gobarber.com.br',
        subject: 'Message',
        text: 'I hope this message gets delivered!',
      });
    });
  }
}

export default ProcessQueueService;
