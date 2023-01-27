import { v4 as uuidv4 } from 'uuid';

import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../infra/typeorm/entities/User';
import IUsersRepository from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async findById(id: string): Promise<User> {
    const user = await this.users.find((user) => user.id === id);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.users.find((user) => user.email === email);

    return user;
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuidv4(),
      name,
      email,
      password,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(
      (findUser) => findUser.id === user.id
    );

    this.users[findIndex] = user;

    return user;
  }
}

export default UsersRepositoryInMemory;
