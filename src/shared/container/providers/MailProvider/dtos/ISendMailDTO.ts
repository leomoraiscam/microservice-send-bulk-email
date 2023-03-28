interface IMailContact {
  name: string;
  email: string;
}

interface ISendMailDTO {
  from?: IMailContact;
  to: Partial<IMailContact>;
  subject: string;
  text: string;
}

export default ISendMailDTO;
