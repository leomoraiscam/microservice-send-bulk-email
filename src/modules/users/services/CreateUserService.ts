import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository
  ) {}

  async execute({ name, email, password }: ICreateUserDTO): Promise<User> {
    const userExist = await this.usersRepository.findByEmail(email);

    if (userExist) {
      throw new AppError('User already exist', 400);
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    return user;
  }
}

export default CreateUserUseCase;
