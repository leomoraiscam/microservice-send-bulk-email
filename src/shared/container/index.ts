import { container } from 'tsyringe';

import ContactsRepository from '@modules/contacts/infra/typeorm/repositories/ContactsRepository';
import TagsRepository from '@modules/contacts/infra/typeorm/repositories/TagsRepository';
import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';
import ITagsRepository from '@modules/contacts/repositories/ITagsRepository';

container.registerSingleton<IContactsRepository>(
  'ContactsRepository',
  ContactsRepository
);

container.registerSingleton<ITagsRepository>('TagsRepository', TagsRepository);
