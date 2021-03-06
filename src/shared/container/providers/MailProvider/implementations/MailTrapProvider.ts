import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from '../models/IMailProvider';

interface ISendMail {
  from: string;
  to: string;
  subject: string;
  text: string;
}
class MailTrapProvider implements IMailProvider {
  private transporter: Transporter;

  constructor() {
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
