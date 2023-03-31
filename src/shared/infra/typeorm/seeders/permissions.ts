import { Connection } from 'typeorm';

import Permission from '@modules/accessControlList/infra/typeorm/entities/Permission';

import { permissionsData } from './data';

const PermissionsSeed = async (connection: Connection) => {
  const permissionsRepository = connection.getRepository(Permission);

  await Promise.all(
    permissionsData.map(async ({ name, description }) => {
      const checkPermissionExist = await permissionsRepository.find({
        name,
      });

      if (!checkPermissionExist.length) {
        const permission = permissionsRepository.create({
          name,
          description,
        });

        await permissionsRepository.save(permission);

        console.log(`${name} permissions created ✔️`);
      }
    })
  );
};

export default PermissionsSeed;
