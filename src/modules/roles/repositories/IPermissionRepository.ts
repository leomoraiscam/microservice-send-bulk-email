import ICreatePermissionDTO from '../dtos/ICreatePermissionsDTO';
import Permission from '../infra/typeorm/entities/Permission';

interface IPermissionsRepository {
  findByIds(ids: string[]): Promise<Permission[]>;
  findByName(name: string): Promise<Permission | undefined>;
  create(data: ICreatePermissionDTO): Promise<Permission>;
}

export default IPermissionsRepository;
