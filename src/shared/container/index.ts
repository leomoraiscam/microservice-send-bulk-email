import { container } from 'tsyringe';

import ContactsRepository from '@modules/contacts/infra/mongoose/repositories/ContactsRepository';
import TagsRepository from '@modules/contacts/infra/mongoose/repositories/TagsRepository';
import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';
import ITagsRepository from '@modules/contacts/repositories/ITagsRepository';

container.registerSingleton<ITagsRepository>('TagsRepository', TagsRepository);

container.registerSingleton<IContactsRepository>(
  'ContactsRepository',
  ContactsRepository
);
