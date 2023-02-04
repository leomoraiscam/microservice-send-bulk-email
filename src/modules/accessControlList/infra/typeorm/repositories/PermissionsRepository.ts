import { getRepository, Repository } from 'typeorm';

import ICreatePermissionsDTO from '@modules/accessControlList/dtos/ICreatePermissionsDTO';
import IPermissionsRepository from '@modules/accessControlList/repositories/IPermissionsRepository';

import Permission from '../entities/Permission';

class PermissionsRepository implements IPermissionsRepository {
  private repository: Repository<Permission>;

  constructor() {
    this.repository = getRepository(Permission);
  }

  findByIds(ids: string[]): Promise<Permission[]> {
    const permissions = this.repository.findByIds(ids);

    return permissions;
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
