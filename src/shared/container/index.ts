import { container } from 'tsyringe';
import './providers';

import ContactsRepository from '@modules/contacts/infra/typeorm/repositories/ContactsRepository';
import TagsRepository from '@modules/contacts/infra/typeorm/repositories/TagsRepository';
import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';
import ITagsRepository from '@modules/contacts/repositories/ITagsRepository';
import MessagesRepository from '@modules/messages/infra/typeorm/repositories/MessagesRepository';
import IMessageRepository from '@modules/messages/repositories/IMessageRepository';
import PermissionsRepository from '@modules/roles/infra/typeorm/repositories/PermissionsRepository';
import RolesRepository from '@modules/roles/infra/typeorm/repositories/RolesRepository';
import IPermissionRepository from '@modules/roles/repositories/IPermissionRepository';
import IRolesRepository from '@modules/roles/repositories/IRolesRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

container.registerSingleton<IContactsRepository>(
  'ContactsRepository',
  ContactsRepository
);

container.registerSingleton<ITagsRepository>('TagsRepository', TagsRepository);

container.registerSingleton<IMessageRepository>(
  'MessagesRepository',
  MessagesRepository
);

container.registerSingleton<IUsersRepository>(
  'UserRepository',
  UsersRepository
);

container.registerSingleton<IRolesRepository>(
  'RolesRepository',
  RolesRepository
);

container.registerSingleton<IPermissionRepository>(
  'PermissionsRepository',
  PermissionsRepository
);
