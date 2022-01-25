import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Role from '../infra/typeorm/entities/Role';
import IRoleRepository from '../repositories/IRolesRepository';

interface IRoleRequest {
  name: string;
  description: string;
}

@injectable()
class CreateRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRoleRepository
  ) {}

  async execute({ name, description }: IRoleRequest): Promise<Role> {
    const roleExists = await this.rolesRepository.findByName(name);

    if (roleExists) {
      throw new AppError('Role already exist', 409);
    }

    const role = await this.rolesRepository.create({
      name,
      description,
    });

    return role;
  }
}

export default CreateRoleService;
