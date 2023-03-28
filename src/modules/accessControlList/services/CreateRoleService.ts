import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import HttpStatusCode from '@shared/errors/StatusCodes';

import { RoleEnum } from '../dtos/enuns/rolesEnum';
import ICreateRolesDTO from '../dtos/ICreateRolesDTO';
import Role from '../infra/typeorm/entities/Role';
import IRoleRepository from '../repositories/IRolesRepository';

@injectable()
class CreateRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRoleRepository
  ) {}

  async execute({ name, description }: ICreateRolesDTO): Promise<Role> {
    const serializeRole = RoleEnum[name];

    const roleExists = await this.rolesRepository.findByName(serializeRole);

    if (roleExists) {
      throw new AppError('Role already exist', HttpStatusCode.CONFLICT);
    }

    const role = await this.rolesRepository.create({
      name: serializeRole,
      description,
    });

    return role;
  }
}

export default CreateRoleService;
