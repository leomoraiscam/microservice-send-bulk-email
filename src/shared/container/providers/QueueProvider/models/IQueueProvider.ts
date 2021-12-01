interface IJob {
  data: object;
}

interface IQueueProvider {
  add(data: object): Promise<void>;
  process(processFunction: (job: IJob) => Promise<void>): void;
}

export default IQueueProvider;
