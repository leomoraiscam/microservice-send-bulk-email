import Queue from 'bull';

const MailQueue = new Queue('mail', {
  redis: {
    host: process.env.REDIS_URL,
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASS,
  },
});

export default MailQueue;
