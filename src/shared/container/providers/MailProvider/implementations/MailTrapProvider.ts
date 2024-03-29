import nodemailer, { Transporter } from 'nodemailer';

import mailConfig from '@config/mail/index';

import ISendMail from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

class MailTrapProvider implements IMailProvider {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(mailConfig.config.mailtrap);
  }

  async sendMail({ from, to, subject, text }: ISendMail): Promise<void> {
    const message = await this.transporter.sendMail({
      from: {
        name: from?.name || 'Equipe Bulk-message',
        address: from?.email || 'sender@example.com',
      },
      to: {
        name: to.name || '',
        address: to.email,
      },
      subject,
      text,
    });

    console.log('Message sent:', message.messageId);
  }
}

export default MailTrapProvider;
