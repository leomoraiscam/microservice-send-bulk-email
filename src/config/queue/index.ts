import { QueueOptions } from 'bull';

interface IQueueConfig {
  driver: 'bull';
  config: {
    bull: QueueOptions;
  };
}

export default {
  driver: 'bull',
  config: {
    bull: {},
  },
} as IQueueConfig;
