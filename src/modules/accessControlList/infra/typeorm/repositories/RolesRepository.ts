import { getRepository, Repository } from 'typeorm';

import ICreateRolesDTO from '@modules/accessControlList/dtos/ICreateRolesDTO';
import IRolesRepository from '@modules/accessControlList/repositories/IRolesRepository';

import Role from '../entities/Role';

class RolesRepository implements IRolesRepository {
  private repository: Repository<Role>;

  constructor() {
    this.repository = getRepository(Role);
  }

  findById(id: string): Promise<Role> {
    const roles = this.repository.findOne({
      where: {
        id,
      },
      relations: ['permissions'],
    });

    return roles;
  }

  findByIds(ids: string[]): Promise<Role[]> {
    const roles = this.repository.findByIds(ids);

    return roles;
  }

  findByName(name: string): Promise<Role | undefined> {
    return this.repository.findOne({
      where: {
        name,
      },
    });
  }

  async create({ name, description }: ICreateRolesDTO): Promise<Role> {
    const role = this.repository.create({
      name,
      description,
    });

    await this.repository.save(role);

    return role;
  }

  async save(role: Role): Promise<Role> {
    return this.repository.save(role);
  }
}

export default RolesRepository;
