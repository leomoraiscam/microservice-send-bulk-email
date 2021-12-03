import IJobData from '@modules/messages/dtos/IMessageJobDTO';

import IQueueProvider from '../models/IQueueProvider';

export interface IJob {
  data: IJobData;
}

interface IJobProcess {
  data: object;
}

class QueueProviderInMemory implements IQueueProvider {
  public jobs: IJobData[] = [];

  async add(job: IJobData): Promise<void> {
    this.jobs.push(job);
  }

  process(processFunction: (job: IJobProcess) => Promise<void>): void {
    this.jobs.forEach((job, index) => {
      processFunction({ data: job });

      this.jobs.slice(index, 1);
    });
  }
}

export default QueueProviderInMemory;
