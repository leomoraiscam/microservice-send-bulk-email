import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class CreateSubscribedFieldInContactsTable1644285435308
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'contacts',
      new TableColumn({
        name: 'subscribed',
        type: 'boolean',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('contacts', 'subscribed');
  }
}
