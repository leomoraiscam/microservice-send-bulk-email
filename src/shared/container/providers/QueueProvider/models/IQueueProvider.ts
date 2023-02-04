import IJobProcessDTO from '../dtos/IJobProcessDTO';

interface IQueueProvider {
  add(data: object): Promise<void>;
  process(processFunction: (job: IJobProcessDTO) => Promise<void>): void;
}

export default IQueueProvider;
