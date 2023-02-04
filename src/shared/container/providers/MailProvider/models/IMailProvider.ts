import ISendMailDTO from '../dtos/ISendMailDTO';

interface IMailProvider {
  sendMail({ to, subject, text }: ISendMailDTO): Promise<void>;
}

export default IMailProvider;
