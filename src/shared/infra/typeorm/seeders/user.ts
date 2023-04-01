import * as dotenv from 'dotenv';
import { Connection, In } from 'typeorm';

import Permission from '@modules/accessControlList/infra/typeorm/entities/Permission';
import Role from '@modules/accessControlList/infra/typeorm/entities/Role';
import User from '@modules/users/infra/typeorm/entities/User';
import BCryptHashProvider from '@shared/container/providers/HashProvider/implementations/BCrtyptHashProvider';

dotenv.config();

const users = [
  {
    name: process.env.SYSTEM_DEVELOPER_USER || 'admin default',
    email: process.env.SYSTEM_DEVELOPER_EMAIL || 'admin_default@email.com',
    password: process.env.SYSTEM_DEVELOPER_PASS || 'default_password',
    roles: ['admin'],
    permissions: [
      'create-sender',
      'create-subscription',
      'create-broadcast',
      'create-role',
      'create-permission',
      'send-email',
      'list-data',
    ],
  },
  {
    name: 'sender mailers',
    email: 'sender_user_default@email.com',
    password: 'default_password',
    roles: ['sender'],
    permissions: ['send-email', 'list-data'],
  },
  {
    name: 'user viewer',
    email: 'viewer_user_default@email.com',
    password: 'default_password',
    roles: ['viewer'],
    permissions: ['list-data'],
  },
];

const UserSeed = async (connection: Connection) => {
  const usersRepository = connection.getRepository(User);
  const permissionRepository = connection.getRepository(Permission);
  const rolesRepository = connection.getRepository(Role);
  const encryptProvider = new BCryptHashProvider();

  await Promise.all(
    users.map(
      async ({
        name,
        email,
        password,
        permissions: userPermissions,
        roles: userRoles,
      }) => {
        const checkUserExist = await usersRepository.find({
          email: users[0].email,
        });

        if (!checkUserExist.length) {
          const roles = await rolesRepository.find({
            name: In([...userRoles]),
          });

          const permissions = await permissionRepository.find({
            name: In([...userPermissions]),
          });

          const hashedPassword = await encryptProvider.generateHash(password);

          const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
            roles,
            permissions,
          });

          await usersRepository.save(user);

          console.log(`User email ${users[0].email} created ✔️`);
        }
      }
    )
  );
};

export default UserSeed;
