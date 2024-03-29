import RolesRepositoryInMemory from '@modules/accessControlList/repositories/in-memory/InMemoryRoles.repository';
import AppError from '@shared/errors/AppError';

import CreateRoleService from './CreateRoleService';

describe('CreateRoleService', () => {
  let createRoleService: CreateRoleService;
  let inMemoryRolesRepository: RolesRepositoryInMemory;

  beforeEach(async () => {
    inMemoryRolesRepository = new RolesRepositoryInMemory();

    createRoleService = new CreateRoleService(inMemoryRolesRepository);
  });

  it('should be able to create a role', async () => {
    const role = await createRoleService.execute({
      name: 'admin',
      description: 'administration role',
    });

    expect(role).toHaveProperty('id');
  });

  it('should not be able to create a role when the same exist', async () => {
    await inMemoryRolesRepository.create({
      name: 'admin',
      description: 'administration role',
    });

    await expect(
      createRoleService.execute({
        name: 'ADMIN',
        description: 'administration role',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
