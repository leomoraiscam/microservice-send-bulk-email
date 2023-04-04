/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as dotenv from 'dotenv';

import ContactsRepository from '@modules/contacts/infra/typeorm/repositories/ContactsRepository';
import ChangeContactSubscriptionStatusService from '@modules/contacts/services/ChangeContactSubscriptionStatusService';

import '../../typeorm/index';
import UpdateContactInfoHandler from '../handlers/UpdateContactInfoHandler';

dotenv.config();

function makeUpdateUserInfoHandler() {
  const postgresContactsRepository = new ContactsRepository();

  const changeContactSubscriptionStatusService =
    new ChangeContactSubscriptionStatusService(postgresContactsRepository);

  const updateContactInfoHandler = new UpdateContactInfoHandler(
    changeContactSubscriptionStatusService
  );

  return updateContactInfoHandler;
}

export default makeUpdateUserInfoHandler;
