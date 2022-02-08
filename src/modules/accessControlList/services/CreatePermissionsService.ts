import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Permission from '../infra/typeorm/entities/Permission';
import IPermissionsRepository from '../repositories/IPermissionRepository';

interface IPermissionsRequest {
  name: string;
  description: string;
}

@injectable()
class CreatePermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository
  ) {}

  async execute({
    name,
    description,
  }: IPermissionsRequest): Promise<Permission> {
    const permissionExists = await this.permissionsRepository.findByName(name);

    if (permissionExists) {
      throw new AppError('Permissions already exist', 409);
    }

    const permission = await this.permissionsRepository.create({
      name,
      description,
    });

    return permission;
  }
}

export default CreatePermissionService;
