import * as dotenv from 'dotenv';

dotenv.config();

import { start } from './consumer' // eslint-disable-line

start().then(() => {
  console.log(`Kafka running!`);
});
