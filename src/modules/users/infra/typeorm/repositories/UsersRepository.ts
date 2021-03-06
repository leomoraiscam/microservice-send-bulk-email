import { getRepository, Repository } from 'typeorm';

import ICreateUserDTO from '../../../dtos/ICreateUserDTO';
import IUserRepository from '../../../repositories/IUsersRepository';
import User from '../entities/User';

class UsersRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        id,
      },
      relations: ['permissions', 'roles'],
    });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async list(): Promise<User[]> {
    return this.repository.find();
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
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
