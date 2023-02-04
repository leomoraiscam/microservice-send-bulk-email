import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

class MailProviderInMemory implements IMailProvider {
  private message: any[] = [];

  async sendMail({ from, to, subject, text }: ISendMailDTO): Promise<void> {
    this.message.push({
      from,
      to,
      subject,
      text,
    });
  }
}

export default MailProviderInMemory;
