import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';

import 'express-async-errors';
import AppError from '@shared/errors/AppError';

import routes from './http/routes/index';
import '@shared/infra/mongoose/connection';

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

    console.log('Error: ', error.message);

    return response.status(500).json({
      message: 'Internal Server Error',
      status: 'Error',
    });
  }
);

app.listen(3333, () => {
  console.log('🚀 Server is running');
});
