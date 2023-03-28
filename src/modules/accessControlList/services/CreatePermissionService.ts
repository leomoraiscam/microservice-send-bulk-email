import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import HttpStatusCode from '@shared/errors/StatusCodes';

import ICreatePermissionsDTO from '../dtos/ICreatePermissionsDTO';
import Permission from '../infra/typeorm/entities/Permission';
import IPermissionsRepository from '../repositories/IPermissionsRepository';

@injectable()
class CreatePermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository
  ) {}

  async execute({
    name,
    description,
  }: ICreatePermissionsDTO): Promise<Permission> {
    const permissionExists = await this.permissionsRepository.findByName(name);

    if (permissionExists) {
      throw new AppError('Permissions already exist', HttpStatusCode.CONFLICT);
    }

    const permission = await this.permissionsRepository.create({
      name,
      description,
    });

    return permission;
  }
}

export default CreatePermissionService;
