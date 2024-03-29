import { NextFunction, Request, Response } from 'express';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import HttpStatusCode from '@shared/errors/StatusCodes';

export function can(permissionsData: string[]) {
  return async (request: Request, _: Response, next: NextFunction) => {
    const { id } = request.user;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError('User does not exist', HttpStatusCode.NOT_FOUND);
    }

    const permissionExist = user.permissions
      .map((permission) => permission.name)
      .some((permission) => permissionsData.includes(permission));

    if (!permissionExist) {
      throw new AppError('forbiden', HttpStatusCode.FORBIDDEN);
    }

    next();
  };
}

export function is(rolesData: string[]) {
  return async (request: Request, _: Response, next: NextFunction) => {
    const { id } = request.user;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError('User does not exist', HttpStatusCode.NOT_FOUND);
    }

    const rolesExist = user.roles
      .map((role) => role.name)
      .some((role) => rolesData.includes(role));

    if (!rolesExist) {
      throw new AppError('forbiden', HttpStatusCode.FORBIDDEN);
    }

    next();
  };
}
