import { getRepository, Repository } from 'typeorm';

import ICreateRoleDTO from '../../../dtos/ICreateRoleDTO';
import IRolesRepository from '../../../repositories/IRolesRepository';
import Role from '../entities/Role';

class RolesRepository implements IRolesRepository {
  private repository: Repository<Role>;

  constructor() {
    this.repository = getRepository(Role);
  }

  findByName(name: string): Promise<Role | undefined> {
    return this.repository.findOne({
      where: {
        name,
      },
    });
  }

  async create({ name, description }: ICreateRoleDTO): Promise<Role> {
    const role = this.repository.create({
      name,
      description,
    });

    await this.repository.save(role);

    return role;
  }
}

export default RolesRepository;
