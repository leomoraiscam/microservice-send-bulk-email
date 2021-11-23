import nodemailer, { Transporter } from 'nodemailer';

class SendMessageToRecipientService {
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

  async execute(): Promise<void> {
    await this.transporter.sendMail({
      from: 'sender@example.com',
      to: 'equipe@gobarber.com.br',
      subject: 'Message',
      text: 'I hope this message gets delivered!',
    });
  }
}

export default SendMessageToRecipientService;
