import { createConnection } from 'typeorm';

import { CreatePermissionSeeder } from './populate';

(async () => {
  console.log('Starting Seed');
  try {
    const connection = await createConnection();

    await CreatePermissionSeeder.run(connection);

    await connection.close();

    console.log('Seeding has done!');
    process.exit(0);
  } catch (error) {
    console.log('Seeding has fail.', error);
    process.exit(1);
  }
})();
