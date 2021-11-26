import { container } from 'tsyringe';
import './providers';

import ContactsRepository from '@modules/contacts/infra/typeorm/repositories/ContactsRepository';
import TagsRepository from '@modules/contacts/infra/typeorm/repositories/TagsRepository';
import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';
import ITagsRepository from '@modules/contacts/repositories/ITagsRepository';
import MessagesRepository from '@modules/messages/infra/typeorm/repositories/MessagesRepository';
import IMessageRepository from '@modules/messages/repositories/IMessageRepository';

container.registerSingleton<IContactsRepository>(
  'ContactsRepository',
  ContactsRepository
);

container.registerSingleton<ITagsRepository>('TagsRepository', TagsRepository);

container.registerSingleton<IMessageRepository>(
  'MessagesRepository',
  MessagesRepository
);
