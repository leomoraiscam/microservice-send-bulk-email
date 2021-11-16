import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateContactsTagsTable1637022245604
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'contacts_tags',
        columns: [
          {
            name: 'contact_id',
            type: 'uuid',
          },
          {
            name: 'tag_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKContactTag',
            referencedTableName: 'contacts',
            referencedColumnNames: ['id'],
            columnNames: ['contact_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKTagContact',
            referencedTableName: 'tags',
            referencedColumnNames: ['id'],
            columnNames: ['tag_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('contacts_tags');
  }
}
