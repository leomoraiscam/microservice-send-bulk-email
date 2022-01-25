import ICreateRoleDTO from '../dtos/ICreateRoleDTO';
import Role from '../infra/typeorm/entities/Role';

interface IRoleRepository {
  findByIds(ids: string[]): Promise<Role[]>;
  findByName(name: string): Promise<Role | undefined>;
  create(data: ICreateRoleDTO): Promise<Role>;
}

export default IRoleRepository;
