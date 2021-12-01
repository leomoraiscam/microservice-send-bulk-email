import 'reflect-metadata';
import 'dotenv/config';
import { container } from 'tsyringe';

import '@shared/infra/typeorm';
import '@shared/container';

import ProcessQueueService from '@modules/messages/services/ProcessQueueService';

const processQueue = container.resolve(ProcessQueueService);

processQueue.execute();

console.log('⚗‎‎  Processing mail sending queue!');
