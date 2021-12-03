import Contact from '@modules/contacts/infra/typeorm/entities/Contact';
import Message from '@modules/messages/infra/typeorm/schemas/Message';

interface IMessageJobDTO {
  contact: Contact;
  message: Message;
}

export default IMessageJobDTO;
