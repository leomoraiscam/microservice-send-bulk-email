import 'reflect-metadata';
import 'dotenv/config';
import Queue from 'bull';
import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';

import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import 'express-async-errors';
import AppError from '@shared/errors/AppError';

import '@shared/infra/typeorm';
import swaggerFile from '../../swagger.json';
import routes from './routes';

import '@shared/container';

const someQueue = new Queue('mail');

const serverAdapter = new ExpressAdapter();

createBullBoard({
  queues: [new BullAdapter(someQueue)],
  serverAdapter,
});

const app = express();

serverAdapter.setBasePath('/admin/queues');
app.use('/admin/queues', serverAdapter.getRouter());

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        message: error.message,
        status: 'Error',
      });
    }

    console.log('Error', error.message);

    return response.status(500).json({
      message: 'Internal Server Error',
      status: 'Error',
    });
  }
);

export default app;
