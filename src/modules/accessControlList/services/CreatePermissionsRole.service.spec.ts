import PermissionsRepositoryInMemory from '@modules/accessControlList/repositories/in-memory/InMemoryPermissions.repository';
import RolesRepositoryInMemory from '@modules/accessControlList/repositories/in-memory/InMemoryRoles.repository';

import CreatePermissionsRoleService from './CreatePermissionsRoleService';

describe('CreatePermissionsRolesService', () => {
  let createPermissionsRoleService: CreatePermissionsRoleService;
  let inMemoryRolesRepository: RolesRepositoryInMemory;
  let inMemoryPermissionsRepository: PermissionsRepositoryInMemory;

  beforeEach(async () => {
    inMemoryPermissionsRepository = new PermissionsRepositoryInMemory();
    inMemoryRolesRepository = new RolesRepositoryInMemory();

    createPermissionsRoleService = new CreatePermissionsRoleService(
      inMemoryPermissionsRepository,
      inMemoryRolesRepository
    );
  });

  it('should be able to create a permissions to specific role', async () => {
    const role = await inMemoryRolesRepository.create({
      description: 'Role to administrator',
      name: 'admin',
    });

    const permission = await inMemoryPermissionsRepository.create({
      description: 'permission to authorize create user',
      name: 'create_user',
    });

    const permissionsRole = await createPermissionsRoleService.execute({
      role_id: role.id,
      permissions: [permission.id],
    });

    expect(permissionsRole).toHaveProperty('permissions');
    expect(permissionsRole.permissions.length).toBe(1);
  });
});
