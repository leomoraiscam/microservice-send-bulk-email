import RolesRepository from '@modules/accessControlList/infra/typeorm/repositories/RolesRepository';

import { rolesData } from '../data';

const makeRegisterRoles = async () => {
  const rolesRepository = new RolesRepository();

  const roles = rolesData.map(async (role) => {
    const existRole = await rolesRepository.findByName(role.name);

    if (!existRole) {
      await rolesRepository.create(role);
    }
  });

  await Promise.all(roles);
};

export default makeRegisterRoles;
