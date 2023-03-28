import { container } from 'tsyringe';

import mailConfig from '@config/mail/index';

import BCryptHashProvider from './HashProvider/implementations/BCrtyptHashProvider';
import IHashProvider from './HashProvider/models/IHashProvider';
import WinstonProvider from './LoggerProvider/implementations/WinstonProvider';
import ILoggerProvider from './LoggerProvider/models/ILoggerProvider';
import MailTrapProvider from './MailProvider/implementations/MailTrapProvider';
import IMailProvider from './MailProvider/models/IMailProvider';
import BullProvider from './QueueProvider/implementations/BullProvider';
import IQueueProvider from './QueueProvider/models/IQueueProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import IStorageProvider from './StorageProvider/models/IStorageProvider';

const providers = {
  mailtrap: MailTrapProvider,
};

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<IQueueProvider>('QueueProvider', BullProvider);

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
);

container.registerSingleton<ILoggerProvider>('LoggerProvider', WinstonProvider);

container.registerSingleton<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver]
);
