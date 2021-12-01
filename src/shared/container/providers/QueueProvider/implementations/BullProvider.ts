import Bull, { Queue, ProcessPromiseFunction } from 'bull';
import { injectable } from 'tsyringe';

import redisConfig from '@config/redis';

import IQueueProvider from '../models/IQueueProvider';

@injectable()
class BullProvider implements IQueueProvider {
  private queue: Queue;

  constructor() {
    this.queue = new Bull('mail', {
      redis: redisConfig,
    });
  }

  async add(data: object | object[]): Promise<void> {
    if (Array.isArray(data)) {
      const parsedJobs = data.map((job) => {
        return {
          data: job,
        };
      });

      await this.queue.addBulk(parsedJobs);
    }

    await this.queue.add(data);
  }

  process(processFunction: ProcessPromiseFunction<object>): void {
    this.queue.process(150, processFunction);
  }
}

export default BullProvider;
