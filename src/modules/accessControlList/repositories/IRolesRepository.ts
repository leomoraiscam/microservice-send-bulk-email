import ICreateRolesDTO from '../dtos/ICreateRolesDTO';
import Role from '../infra/typeorm/entities/Role';

interface IRolesRepository {
  findById(ids: string): Promise<Role>;
  findByIds(ids: string[]): Promise<Role[]>;
  findByName(name: string): Promise<Role | undefined>;
  create(data: ICreateRolesDTO): Promise<Role>;
  bulkCreate(data: ICreateRolesDTO[]): Promise<Role[]>;
  save(role: Role): Promise<Role>;
}

export default IRolesRepository;
