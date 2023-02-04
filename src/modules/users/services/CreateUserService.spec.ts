import InMemoryHashProvider from '@shared/container/providers/HashProvider/in-memory/InMemoryHashProvider';
import AppError from '@shared/errors/AppError';

import UsersRepositoryInMemory from '../repositories/in-memory/UsersRepositoryInMemory';
import CreateUserService from './CreateUserService';

describe('CreateUserService', () => {
  let createUserService: CreateUserService;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let inMemoryHashProvider: InMemoryHashProvider;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    inMemoryHashProvider = new InMemoryHashProvider();
    createUserService = new CreateUserService(
      usersRepositoryInMemory,
      inMemoryHashProvider
    );
  });

  it('should be able create a user when receive correct data', async () => {
    const user = await createUserService.execute({
      name: 'Catherine Gutierrez',
      email: 'rombej@jahouc.nl',
      password: 'Test@123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able create an user when the same exist', async () => {
    await usersRepositoryInMemory.create({
      name: 'John Doe',
      email: 'jonh@email.com',
      password: 'Test@123',
    });

    await expect(
      createUserService.execute({
        name: 'John Doe',
        email: 'jonh@email.com',
        password: 'Test@123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
