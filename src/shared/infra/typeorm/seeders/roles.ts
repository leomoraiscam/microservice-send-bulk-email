import { Connection, In } from 'typeorm';

import Role from '@modules/accessControlList/infra/typeorm/entities/Role';

import { rolesData } from './data';

const RolesSeed = async (connection: Connection) => {
  const rolesRepository = connection.getRepository(Role);

  await Promise.all(
    rolesData.map(async ({ name, description }) => {
      const checkRoleExist = await rolesRepository.find({
        name,
      });

      if (!checkRoleExist.length) {
        const role = rolesRepository.create({
          name,
          description,
        });

        await rolesRepository.save(role);

        console.log(`${name} role created ✔️`);
      }
    })
  );
};

export default RolesSeed;
