import { RedisOptions } from 'ioredis';

type RedisConfig = RedisOptions;

export default {
  host: process.env.REDIS_URL,
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASS,
} as RedisConfig;
