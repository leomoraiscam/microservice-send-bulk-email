import PermissionsRepository from '@modules/accessControlList/infra/typeorm/repositories/PermissionsRepository';

import { permissionsData } from '../data';
import '@shared/infra/typeorm';

export const makeRegisterPermissions = async () => {
  const permissionsRepository = new PermissionsRepository();

  const permissions = permissionsData.map(async (permission) => {
    const existPermission = await permissionsRepository.findByName(
      permission.name
    );

    if (!existPermission) {
      const permissionData = await permissionsRepository.create(permission);

      console.log(`${permissionData.name} was created`);
    }
  });

  await Promise.all(permissions);
};
