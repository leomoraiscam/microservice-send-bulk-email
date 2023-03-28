import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import HttpStatusCode from '@shared/errors/StatusCodes';

import ICreateACLsToUserDTO from '../dtos/ICreateAccessControlListToUserDTO';
import IPermissionsRepository from '../repositories/IPermissionsRepository';
import IRoleRepository from '../repositories/IRolesRepository';

@injectable()
class CreateAccessControlListToUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
    @inject('RolesRepository')
    private rolesRepository: IRoleRepository
  ) {}

  async execute({
    user_id,
    roles,
    permissions,
  }: ICreateACLsToUserDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Users does not exist', HttpStatusCode.NOT_FOUND);
    }

    const permissionsExists = await this.permissionsRepository.findByIds(
      permissions
    );

    if (!permissionsExists.length) {
      throw new AppError('Permissions not found', HttpStatusCode.NOT_FOUND);
    }

    const rolesExists = await this.rolesRepository.findByIds(roles);

    if (!rolesExists.length) {
      throw new AppError('Roles not found', HttpStatusCode.NOT_FOUND);
    }

    Object.assign(user, {
      roles: rolesExists,
      permissions: permissionsExists,
    });

    await this.usersRepository.save(user);

    return user;
  }
}

export default CreateAccessControlListToUserService;
