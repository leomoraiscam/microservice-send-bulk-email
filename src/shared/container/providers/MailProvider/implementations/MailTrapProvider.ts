import nodemailer, { Transporter } from 'nodemailer';

import mailConfig from '@config/mail/index';

import ISendMail from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

class MailTrapProvider implements IMailProvider {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(mailConfig.config.mailtrap);
  }

  async sendMail({ to, subject, text }: ISendMail): Promise<void> {
    const message = await this.transporter.sendMail({
      from: 'sender@example.com',
      to,
      subject,
      text,
    });

    console.log('Message sent:', message.messageId);
  }
}

export default MailTrapProvider;
