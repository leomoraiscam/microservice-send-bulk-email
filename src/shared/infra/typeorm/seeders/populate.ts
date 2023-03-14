/* eslint-disable import/prefer-default-export */
import { Connection, IsNull } from 'typeorm';

import Permission from '@modules/accessControlList/infra/typeorm/entities/Permission';
import Role from '@modules/accessControlList/infra/typeorm/entities/Role';
import User from '@modules/users/infra/typeorm/entities/User';
import BCryptHashProvider from '@shared/container/providers/HashProvider/implementations/BCrtyptHashProvider';

import { permissionsData, rolesData } from './data';

export class CreatePermissionSeeder {
  static async run(connection: Connection): Promise<void> {
    const users = [
      {
        name: 'user admin',
        email: 'user_admin@email.com',
        password: 'admin_pass',
        roles: [
          {
            name: 'admin',
          },
        ],
        permissions: [
          {
            name: 'create-sender',
          },
          {
            name: 'create-subscription',
          },
          {
            name: 'create-broadcast',
          },
          {
            name: 'create-role',
          },
          {
            name: 'create-permission',
          },
        ],
      },
    ];

    const permissions_roles = [
      {
        name: 'admin',
        permissions: [
          {
            name: 'create-sender',
          },
          {
            name: 'create-subscription',
          },
          {
            name: 'create-broadcast',
          },
          {
            name: 'create-role',
          },
          {
            name: 'create-permission',
          },
        ],
      },
      {
        name: 'viewer',
        permissions: [
          {
            name: 'list-data',
          },
        ],
      },
      {
        name: 'sender',
        permissions: [
          {
            name: 'send-email',
          },
        ],
      },
    ];

    const users_permissions = [
      {
        email: 'user_admin@email.com',
        permissions: [
          {
            name: 'create-sender',
          },
          {
            name: 'create-subscription',
          },
          {
            name: 'create-broadcast',
          },
          {
            name: 'create-role',
          },
          {
            name: 'create-permission',
          },
        ],
      },
    ];

    const usersRepository = connection.getRepository(User);
    const permissionRepository = connection.getRepository(Permission);
    const rolesRepository = connection.getRepository(Role);

    const encryptProvider = new BCryptHashProvider();

    await Promise.all(
      permissionsData.map(async (item) => {
        const existPermission = await permissionRepository.findOne({
          where: {
            name: item.name,
          },
        });

        if (!existPermission) {
          const savedItem = permissionRepository.create(item);

          await permissionRepository.save(savedItem);
        }
      })
    );

    await Promise.all(
      rolesData.map(async (item) => {
        const existRole = await rolesRepository.findOne({
          where: {
            name: item.name,
          },
        });

        if (!existRole) {
          const savedItem = rolesRepository.create(item);

          await rolesRepository.save(savedItem);
        }
      })
    );

    await Promise.all(
      permissions_roles.map(async (item) => {
        const permissionsPromises = item.permissions.map(
          async (permissionItem) => {
            const existPermission = await permissionRepository.findOne({
              where: {
                name: permissionItem.name,
              },
            });

            return existPermission;
          }
        );

        const resolvedPermissions = await Promise.all(permissionsPromises);

        const existRole = await rolesRepository.findOne({
          where: {
            name: item.name,
          },
        });

        if (existRole) {
          await rolesRepository.save({
            id: existRole.id,
            ...item,
            description: existRole.description,
            permissions: resolvedPermissions,
          });
        }
      })
    );

    await Promise.all(
      users.map(async (item) => {
        const existUser = await usersRepository.findOne({
          where: {
            email: item.email,
          },
        });

        if (!existUser) {
          const permissionsPromises = item.permissions.map(
            async (permissionItem) => {
              const existPermission = await permissionRepository.findOne({
                where: {
                  name: permissionItem.name,
                },
              });

              return existPermission;
            }
          );

          const resolvedPermissions = await Promise.all(permissionsPromises);

          const rolesPromises = item.roles.map(async (permissionItem) => {
            const existPermission = await rolesRepository.findOne({
              where: {
                name: permissionItem.name,
              },
            });

            return existPermission;
          });

          const resolvedRoles = await Promise.all(rolesPromises);

          const password = await encryptProvider.generateHash(item.password);

          const savedItem = usersRepository.create({
            name: item.name,
            email: item.email,
            password,
            permissions: resolvedPermissions,
            roles: resolvedRoles,
          });

          await usersRepository.save(savedItem);
        }
      })
    );

    await Promise.all(
      users_permissions.map(async (item) => {
        const permissionsPromises = item.permissions.map(
          async (permissionItem) => {
            const existPermission = await permissionRepository.findOne({
              where: {
                name: permissionItem.name,
              },
            });

            return existPermission;
          }
        );

        const resolvedPermissions = await Promise.all(permissionsPromises);

        const existUser = await usersRepository.findOne({
          where: {
            email: item.email,
          },
        });

        if (existUser) {
          await usersRepository.save({
            id: existUser.id,
            ...existUser,
            permissions: resolvedPermissions,
          });
        }
      })
    );
  }
}
