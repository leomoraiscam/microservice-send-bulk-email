import { getRepository, Repository } from 'typeorm';

import ICreatePermissionsDTO from '../../../dtos/ICreatePermissionsDTO';
import IPermissionsRepository from '../../../repositories/IPermissionRepository';
import Permission from '../entities/Permission';

class PermissionsRepository implements IPermissionsRepository {
  private repository: Repository<Permission>;

  constructor() {
    this.repository = getRepository(Permission);
  }

  findByName(name: string): Promise<Permission | undefined> {
    return this.repository.findOne({
      where: {
        name,
      },
    });
  }

  async create({
    name,
    description,
  }: ICreatePermissionsDTO): Promise<Permission> {
    const permission = this.repository.create({
      name,
      description,
    });

    await this.repository.save(permission);

    return permission;
  }
}

export default PermissionsRepository;
