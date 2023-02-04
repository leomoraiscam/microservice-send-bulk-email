import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

import ITokenPayloadDTO from '../dtos/ITokenPayloadDTO';

export default function ensureAuthenticated(
  req: Request,
  _: Response,
  next: NextFunction
): void | Error {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing.');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, authConfig.jwt.secret);

    const { sub } = decoded as ITokenPayloadDTO;

    req.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
