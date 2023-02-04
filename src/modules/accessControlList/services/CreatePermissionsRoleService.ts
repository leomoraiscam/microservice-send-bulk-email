import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreatePermissionsRoleDTO from '../dtos/ICreatePermissionsRoleDTO';
import Role from '../infra/typeorm/entities/Role';
import IPermissionsRepository from '../repositories/IPermissionsRepository';
import IRoleRepository from '../repositories/IRolesRepository';

@injectable()
class CreatePermissionsRoleService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
    @inject('RolesRepository')
    private rolesRepository: IRoleRepository
  ) {}

  async execute({
    role_id,
    permissions,
  }: ICreatePermissionsRoleDTO): Promise<Role> {
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

export default CreatePermissionsRoleService;
