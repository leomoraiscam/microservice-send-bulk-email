import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import authConfig from '@config/auth';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import HttpStatusCode from '@shared/errors/StatusCodes';

import ICreateSessionsDTO from '../dtos/ICreateSessionsDTO';
import ICreateSessionsResponseDTO from '../dtos/ICreateSessionsResponseDTO';

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  async execute({
    email,
    password,
  }: ICreateSessionsDTO): Promise<ICreateSessionsResponseDTO> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        'Incorrect email/password combination',
        HttpStatusCode.UNAUTHORIZED
      );
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password
    );

    if (!passwordMatched) {
      throw new AppError(
        'Incorrect email/password combination',
        HttpStatusCode.UNAUTHORIZED
      );
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
