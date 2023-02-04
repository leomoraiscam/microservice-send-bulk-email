import InMemoryHashProvider from '@shared/container/providers/HashProvider/in-memory/InMemoryHashProvider';
import AppError from '@shared/errors/AppError';

import UsersRepositoryInMemory from '../repositories/in-memory/UsersRepositoryInMemory';
import AuthenticateUserService from './AuthenticateUserService';

describe('AuthenticateUserService', () => {
  let authenticatedUserService: AuthenticateUserService;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let inMemoryHashProvider: InMemoryHashProvider;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    inMemoryHashProvider = new InMemoryHashProvider();

    authenticatedUserService = new AuthenticateUserService(
      usersRepositoryInMemory,
      inMemoryHashProvider
    );
  });

  it('should be able authenticate users with correct credentials', async () => {
    const { email, password } = await usersRepositoryInMemory.create({
      name: 'Elva Gray',
      email: 'ogocfib@vicca.sx',
      password: 'Test@1234',
    });

    const session = await authenticatedUserService.execute({
      email,
      password,
    });

    expect(session).toHaveProperty('token');
  });

  it('should be not able authenticate users with wrong email', async () => {
    const { password } = await usersRepositoryInMemory.create({
      name: 'Eula Butler',
      email: 'gac@rahliv.mk',
      password: 'Test@1234',
    });

    await expect(
      authenticatedUserService.execute({
        email: 'fesassot@liefu.zw',
        password,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be not able authenticate users with wrong password', async () => {
    const { email } = await usersRepositoryInMemory.create({
      name: 'Alberta Davis',
      email: 'puf@kog.tv',
      password: 'Test@1234',
    });

    await expect(
      authenticatedUserService.execute({
        email,
        password: 'Teste1234@',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be not able authenticate if users a non exist', async () => {
    await expect(
      authenticatedUserService.execute({
        email: 'keta@sav.kz',
        password: 'Teste1234@',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
