import 'dotenv/config';
import express from 'express';

import routes from './http/routes/index';
import '@shared/infra/mongoose/connection';

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3333, () => {
  console.log('🚀 Server is running');
});
