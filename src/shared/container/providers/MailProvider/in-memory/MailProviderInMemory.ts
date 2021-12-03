import IMailProvider from '../models/IMailProvider';

interface ISendMail {
  from: string;
  to: string;
  subject: string;
  text: string;
}

class MailProviderInMemory implements IMailProvider {
  private message: any[] = [];

  async sendMail({ from, to, subject, text }: ISendMail): Promise<void> {
    this.message.push({
      from,
      to,
      subject,
      text,
    });
  }
}

export default MailProviderInMemory;
