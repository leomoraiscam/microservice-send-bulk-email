import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';

import 'express-async-errors';
import AppError from '@shared/errors/AppError';

import routes from './routes';
import '@shared/infra/mongoose/connection';

import '@shared/container';

const app = express();

app.use(express.json());

app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        message: error.message,
        status: 'Error',
      });
    }

    return response.status(500).json({
      message: 'Internal Server Error',
      status: 'Error',
    });
  }
);

export default app;
