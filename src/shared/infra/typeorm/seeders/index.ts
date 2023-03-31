import { createConnection } from 'typeorm';

import PermissionsSeed from './permissions';
import PermissionsRole from './permissions-roles';
import RolesSeed from './roles';
import UsersSeed from './user';

(async () => {
  console.log('Starting Seed');
  try {
    const connection = await createConnection();

    await RolesSeed(connection);
    await PermissionsSeed(connection);
    await PermissionsRole(connection);
    await UsersSeed(connection);

    await connection.close();

    console.log('Seeding has done!');
    process.exit(0);
  } catch (error) {
    console.log('Seeding has fail.', error);
    process.exit(1);
  }
})();
