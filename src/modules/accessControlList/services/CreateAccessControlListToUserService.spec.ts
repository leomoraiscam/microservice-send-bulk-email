import PermissionsRepositoryInMemory from '@modules/accessControlList/repositories/in-memory/InMemoryPermissions.repository';
import RolesRepositoryInMemory from '@modules/accessControlList/repositories/in-memory/InMemoryRoles.repository';
import UsersRepositoryInMemory from '@modules/users/repositories/in-memory/UsersRepositoryInMemory';

import CreateAccessControlListToUserService from './CreateAccessControlListToUserService';

describe('CreateAccessControlListService', () => {
  let createAccessControlListToUserService: CreateAccessControlListToUserService;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let permissionsRepositoryInMemory: PermissionsRepositoryInMemory;
  let rolesRepositoryInMemory: RolesRepositoryInMemory;

  beforeEach(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    permissionsRepositoryInMemory = new PermissionsRepositoryInMemory();
    rolesRepositoryInMemory = new RolesRepositoryInMemory();
    createAccessControlListToUserService =
      new CreateAccessControlListToUserService(
        usersRepositoryInMemory,
        permissionsRepositoryInMemory,
        rolesRepositoryInMemory
      );
  });

  it('should be able to create a permissions to specific role', async () => {
    const user = await usersRepositoryInMemory.create({
      email: 'email@email.com',
      name: 'John does',
      password: '123',
    });

    const role = await rolesRepositoryInMemory.create({
      description: 'Role to administrator',
      name: 'admin',
    });

    const permission = await permissionsRepositoryInMemory.create({
      description: 'permission to authorize create user',
      name: 'create_user',
    });

    const userAccessControlList =
      await createAccessControlListToUserService.execute({
        user_id: user.id,
        roles: [role.id],
        permissions: [permission.id],
      });

    expect(userAccessControlList).toHaveProperty('id');
  });
});
