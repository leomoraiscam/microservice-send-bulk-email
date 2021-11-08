import Queue from 'bull';
import IORedis from 'ioredis-mock';

const mockRedisClient = new IORedis();

const mockedQueue = new Queue('mocked-queue', {
  createClient(): IORedis.Redis {
    return mockRedisClient;
  },
});

jest.genMockFromModule('bull');
jest.mock('bull');

const MockedQueue = Queue as jest.Mock<Queue.Queue>;

MockedQueue.mockImplementationOnce(() => mockedQueue);

export default mockedQueue;
