import { v4 as uuidv4 } from 'uuid';

import Permission from '@modules/accessControlList/infra/typeorm/entities/Permission';

import ICreatePermissionsDTO from '../../dtos/ICreatePermissionsDTO';
import IPermissionsRepository from '../IPermissionsRepository';

class InMemoryPermissionsRepository implements IPermissionsRepository {
  private permissions: Permission[] = [];

  async findByIds(ids: string[]): Promise<Permission[]> {
    const allPermissions = this.permissions.filter((permission) =>
      ids.includes(permission.id)
    );

    return allPermissions;
  }

  async findByName(name: string): Promise<Permission | undefined> {
    return this.permissions.find((permission) => permission.name === name);
  }

  async create({
    description,
    name,
  }: ICreatePermissionsDTO): Promise<Permission> {
    const permission = new Permission();

    Object.assign(permission, {
      id: uuidv4(),
      name,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.permissions.push(permission);

    return permission;
  }
}

export default InMemoryPermissionsRepository;
