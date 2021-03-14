import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class skeleton1615682148699 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            name: 'first_name',
            type: 'varchar',
          },
          {
            name: 'last_name',
            type: 'varchar',
          },
          {
            name: 'id_type',
            type: 'varchar',
          },
          {
            name: 'id_number',
            type: 'varchar',
          },
          {
            name: 'nationality',
            type: 'varchar',
          },
          {
            name: 'address',
            type: 'varchar',
          },
          {
            name: 'phone_number',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'birthdate',
            type: 'dateTime',
          },
          {
            name: 'created_at',
            type: 'dateTime',
          },
          {
            name: 'updated_at',
            type: 'dateTime',
          },
          {
            name: 'deleted_at',
            type: 'dateTime',
          },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: 'cars',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            name: 'brand',
            type: 'varchar',
          },
          {
            name: 'model',
            type: 'varchar',
          },
          {
            name: 'year',
            type: 'integer',
          },
          {
            name: 'kms',
            type: 'integer',
          },
          {
            name: 'color',
            type: 'varchar',
          },
          {
            name: 'ac',
            type: 'tinyint(1)',
          },
          {
            name: 'passengers',
            type: 'integer',
          },
          {
            name: 'transmission',
            type: 'tinyint(1)',
          },

          {
            name: 'price',
            type: 'money',
          },
          {
            name: 'img',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'dateTime',
          },
          {
            name: 'updated_at',
            type: 'dateTime',
          },
          {
            name: 'deleted_at',
            type: 'dateTime',
          },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: 'reservations',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            name: 'car_id',
            type: 'int',
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'start_date',
            type: 'dateTime',
          },
          {
            name: 'finish_date',
            type: 'dateTime',
          },
          {
            name: 'price_per_day',
            type: 'money',
          },
          {
            name: 'total_price',
            type: 'money',
          },
          {
            name: 'payment_method',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'dateTime',
          },
          {
            name: 'updated_at',
            type: 'dateTime',
          },
          {
            name: 'deleted_at',
            type: 'dateTime',
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      'reservations',
      new TableForeignKey({
        columnNames: ['car_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cars',
      })
    );

    await queryRunner.createForeignKey(
      'reservations',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('reservations');
    await queryRunner.dropTable('users');
    await queryRunner.dropTable('cars');
  }
}
