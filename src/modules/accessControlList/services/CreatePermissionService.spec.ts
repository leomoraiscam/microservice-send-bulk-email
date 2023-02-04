import PermissionsRepositoryInMemory from '@modules/accessControlList/repositories/in-memory/InMemoryPermissions.repository';
import AppError from '@shared/errors/AppError';

import CreatePermissionService from './CreatePermissionService';

describe('CreatePermissionService', () => {
  let createPermissionService: CreatePermissionService;
  let permissionsRepositoryInMemory: PermissionsRepositoryInMemory;

  beforeEach(async () => {
    permissionsRepositoryInMemory = new PermissionsRepositoryInMemory();
    createPermissionService = new CreatePermissionService(
      permissionsRepositoryInMemory
    );
  });

  it('should be able to create a permission', async () => {
    const permission = await createPermissionService.execute({
      name: 'Create_user',
      description: 'permission to create users',
    });

    expect(permission).toHaveProperty('id');
  });

  it('should not be able to create a permission when the same exist', async () => {
    const permission = await permissionsRepositoryInMemory.create({
      name: 'Create_user',
      description: 'permission to create users',
    });

    await expect(
      createPermissionService.execute({
        name: permission.name,
        description: 'permission to create users',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
