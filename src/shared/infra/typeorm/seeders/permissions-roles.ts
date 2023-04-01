import { Connection, In } from 'typeorm';

import Permission from '@modules/accessControlList/infra/typeorm/entities/Permission';
import Role from '@modules/accessControlList/infra/typeorm/entities/Role';

const permissions_roles = [
  {
    name: 'admin',
    permissions: [
      'create-sender',
      'create-role',
      'create-permission',
      'create-broadcast',
      'create-subscription',
      'send-email',
      'list-data',
    ],
  },
  {
    name: 'sender',
    permissions: ['send-email', 'list-data'],
  },
  {
    name: 'viewer',
    permissions: ['list-data'],
  },
];

const PermissionsRolesSeed = async (connection: Connection) => {
  const rolesRepository = connection.getRepository(Role);
  const permissionsRepository = connection.getRepository(Permission);

  const mapper = permissions_roles.map(
    async ({ name, permissions: permissionsRoles }) => {
      const role = await rolesRepository.findOne({
        where: {
          name,
        },
        relations: ['permissions'],
      });

      const permissions = await permissionsRepository.find({
        where: {
          name: In([...permissionsRoles]),
        },
      });

      await rolesRepository.save({
        ...role,
        permissions,
      });

      if (!role.permissions.length) {
        console.log(
          `${JSON.stringify(
            permissionsRoles
          )} permissions associate the ${name} role ✔️`
        );
      }
    }
  );

  await Promise.all(mapper);
};

export default PermissionsRolesSeed;
