import 'reflect-metadata';
import 'dotenv/config';
import Queue from 'bull';
import { errors } from 'celebrate';
import express, { Application, Request, Response, NextFunction } from 'express';
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

class App {
  public server: Application;

  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
    this.exceptionHandler();
    this.bullDashboardQueue();
  }

  private middleware() {
    this.server.use(express.json());
  }

  private routes() {
    this.server.use(routes);
    this.server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
  }

  private exceptionHandler() {
    this.server.use(errors());
    this.server.use(
      (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction
      ) => {
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
  }

  private bullDashboardQueue() {
    const someQueue = new Queue('mail');

    const serverAdapter = new ExpressAdapter();

    createBullBoard({
      queues: [new BullAdapter(someQueue)],
      serverAdapter,
    });

    serverAdapter.setBasePath('/admin/queues');

    this.server.use('/admin/queues', serverAdapter.getRouter());
  }
}

export default new App().server;
