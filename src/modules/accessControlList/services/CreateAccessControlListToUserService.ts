import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

import ICreateACLsToUserDTO from '../dtos/ICreateAccessControlListToUserDTO';
import IPermissionsRepository from '../repositories/IPermissionsRepository';
import IRoleRepository from '../repositories/IRolesRepository';

@injectable()
class CreateAccessControlListToUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
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
      throw new AppError('Users does not exist');
    }

    const permissionsExists = await this.permissionsRepository.findByIds(
      permissions
    );

    const rolesExists = await this.rolesRepository.findByIds(roles);

    Object.assign(user, {
      roles: rolesExists,
      permissions: permissionsExists,
    });

    await this.usersRepository.save(user);

    return user;
  }
}

export default CreateAccessControlListToUserService;
