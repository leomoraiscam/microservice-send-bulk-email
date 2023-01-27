import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Role from '../infra/typeorm/entities/Role';
import IPermissionsRepository from '../repositories/IPermissionRepository';
import IRoleRepository from '../repositories/IRolesRepository';

interface IRolePermissions {
  role_id: string;
  permissions: string[];
}

@injectable()
class CreateRolePermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
    @inject('RolesRepository')
    private rolesRepository: IRoleRepository
  ) {}

  async execute({ role_id, permissions }: IRolePermissions): Promise<Role> {
    const role = await this.rolesRepository.findById(role_id);

    if (!role) {
      throw new AppError('Role does not exist');
    }

    const permissionsExists = await this.permissionsRepository.findByIds(
      permissions
    );

    role.permissions = permissionsExists;

    await this.rolesRepository.save(role);

    return role;
  }
}

export default CreateRolePermissionService;
