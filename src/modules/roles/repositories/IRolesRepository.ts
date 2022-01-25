import ICreateRoleDTO from '../dtos/ICreateRoleDTO';
import Role from '../infra/typeorm/entities/Role';

interface IRoleRepository {
  findByName(name: string): Promise<Role | undefined>;
  create(data: ICreateRoleDTO): Promise<Role>;
}

export default IRoleRepository;
