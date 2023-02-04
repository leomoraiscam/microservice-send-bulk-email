import IJobData from '@modules/messages/dtos/IMessageJobDTO';

import IJobProcessDTO from '../dtos/IJobProcessDTO';
import IQueueProvider from '../models/IQueueProvider';

class QueueProviderInMemory implements IQueueProvider {
  public jobs: IJobData[] = [];

  async add(job: IJobData): Promise<void> {
    this.jobs.push(job);
  }

  process(processFunction: (job: IJobProcessDTO) => Promise<void>): void {
    this.jobs.forEach((job, index) => {
      processFunction({ data: job });

      this.jobs.slice(index, 1);
    });
  }
}

export default QueueProviderInMemory;
