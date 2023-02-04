import { getRepository, Repository } from 'typeorm';

import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findById(id: string): Promise<User> {
    return this.repository.findOne({
      where: {
        id,
      },
      relations: ['permissions', 'roles'],
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOne({ email });
  }

  async create({ name, email, password }: ICreateUsersDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
    });

    await this.repository.save(user);

    return user;
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }
}

export default UsersRepository;
