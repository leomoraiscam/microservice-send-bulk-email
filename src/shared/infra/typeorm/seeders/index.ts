import { hash } from 'bcryptjs';
import { Client } from 'pg';
import { Connection, createConnection, getConnectionOptions } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { rolesData } from './data';

const connect = async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: 'localhost',
      username: 'docker',
      password: 'docker',
      database: 'bulk_message',
      port: 5454,
    })
  );
};

async function create() {
  const pgclient = await connect();

  const id = uuidv4();
  const password = await hash('admin', 8);

  // await pgclient.query(
  //   `INSERT INTO
  //     users
  //     (
  //       id,
  //       email,
  //       password,
  //       name,
  //       created_at,
  //       updated_at
  //     )
  //     VALUES (
  //       '${id}',
  //       'email2@admin.com',
  //       '${password}',

  //       'Leonardo',
  //       'now()',
  //       'now()'
  //     )
  //   `
  // );

  const user = await pgclient.query('select * from users');

  const userId = user[0].id;

  const rolesCreated = rolesData.map(async (data) => {
    await pgclient.query(
      `INSERT INTO
        roles
        (
          id,
          name,
          description,
          created_at,
          updated_at
        )
        VALUES (
          '${id}',
          '${data.name}',
          '${data.description}',
          'now()',
          'now()'
        )
      `
    );
  });

  await pgclient.close();
}

// eslint-disable-next-line
create().then(() => console.log('✔️ User admin created'));
