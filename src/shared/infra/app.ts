import 'dotenv/config';
import express from 'express';
import './config/connection';

import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('🚀 Server is running');
});
