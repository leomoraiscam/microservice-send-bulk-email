import { inject, injectable } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUsersRepository';

@injectable()
class ListAllUsersService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository
  ) {}

  async execute(): Promise<User[]> {
    return this.usersRepository.list();
  }
}

export default ListAllUsersService;
