import { container } from 'tsyringe';
import './providers';

import PermissionsRepository from '@modules/accessControlList/infra/typeorm/repositories/PermissionsRepository';
import RolesRepository from '@modules/accessControlList/infra/typeorm/repositories/RolesRepository';
import IPermissionsRepository from '@modules/accessControlList/repositories/IPermissionsRepository';
import IRolesRepository from '@modules/accessControlList/repositories/IRolesRepository';
import ContactsRepository from '@modules/contacts/infra/typeorm/repositories/ContactsRepository';
import TagsRepository from '@modules/contacts/infra/typeorm/repositories/TagsRepository';
import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';
import ITagsRepository from '@modules/contacts/repositories/ITagsRepository';
import MessagesRepository from '@modules/messages/infra/typeorm/repositories/MessagesRepository';
import TemplatesRepository from '@modules/messages/infra/typeorm/repositories/TemplatesRepository';
import IMessagesRepository from '@modules/messages/repositories/IMessagesRepository';
import ITemplatesRepository from '@modules/messages/repositories/ITemplatesRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

container.registerSingleton<IContactsRepository>(
  'ContactsRepository',
  ContactsRepository
);

container.registerSingleton<ITagsRepository>('TagsRepository', TagsRepository);

container.registerSingleton<IMessagesRepository>(
  'MessagesRepository',
  MessagesRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IRolesRepository>(
  'RolesRepository',
  RolesRepository
);

container.registerSingleton<IPermissionsRepository>(
  'PermissionsRepository',
  PermissionsRepository
);

container.registerSingleton<ITemplatesRepository>(
  'TemplatesRepository',
  TemplatesRepository
);
