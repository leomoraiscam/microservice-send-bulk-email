import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

import IPermissionsRepository from '../repositories/IPermissionRepository';
import IRoleRepository from '../repositories/IRolesRepository';

interface IUserACLRequest {
  user_id: string;
  roles: string[];
  permissions: string[];
}

@injectable()
class CreateUserAccessControlListService {
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
  }: IUserACLRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Users does not exist');
    }

    const permissionsExists = await this.permissionsRepository.findByIds(
      permissions
    );

    const rolesExists = await this.rolesRepository.findByIds(roles);

    user.permissions = permissionsExists;

    user.roles = rolesExists;

    await this.usersRepository.save(user);

    return user;
  }
}

export default CreateUserAccessControlListService;
