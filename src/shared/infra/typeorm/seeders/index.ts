import { makeRegisterPermissions } from './factory/populatePermissions';
import '@shared/infra/typeorm';

const seed = async () => {
  try {
    await makeRegisterPermissions();

    console.log('Successfully completed seeding to common permissions');
  } catch (error) {
    console.log('ERROR', error);

    console.log('Failed seeding common access permissions');
  }
};

async function executeSeeders() {
  try {
    await seed();

    console.log('Seeding Completed');
  } catch (error) {
    console.log('Seeding failed');

    throw error;
  }
}

executeSeeders();
