interface ISendMail {
  from: string;
  to: string;
  subject: string;
  text: string;
}

interface IMailProvider {
  sendMail({ to, subject, text }: ISendMail): Promise<void>;
}

export default IMailProvider;
