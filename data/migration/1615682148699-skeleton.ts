import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableUnique } from 'typeorm';

async function createUsersTable(queryRunner: QueryRunner) {
  await queryRunner.createTable(
    new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'role_id',
          type: 'integer',
        },
        {
          name: 'username',
          type: 'varchar',
        },
        {
          name: 'password',
          type: 'varchar',
        },
        {
          name: 'created_at',
          type: 'dateTime',
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'updated_at',
          type: 'dateTime',
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'deleted_at',
          type: 'dateTime',
          default: 'CURRENT_TIMESTAMP',
        },
      ],
    }),
    true
  );

  await queryRunner.createForeignKey(
    'users',
    new TableForeignKey({
      columnNames: ['role_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'roles',
    })
  );

  await queryRunner.createUniqueConstraint(
    'users',
    new TableUnique({
      name: 'users_unique_username',
      columnNames: ['username'],
    })
  );
}

async function createRolesTable(queryRunner: QueryRunner) {
  await queryRunner.createTable(
    new Table({
      name: 'roles',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'created_at',
          type: 'dateTime',
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'updated_at',
          type: 'dateTime',
          default: 'CURRENT_TIMESTAMP',
        },
      ],
    }),
    true
  );

  await queryRunner.createUniqueConstraint(
    'roles',
    new TableUnique({
      name: 'roles_unique_name',
      columnNames: ['name'],
    })
  );
}

async function createClientsTable(queryRunner: QueryRunner) {
  await queryRunner.createTable(
    new Table({
      name: 'clients',
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
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'updated_at',
          type: 'dateTime',
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'deleted_at',
          type: 'dateTime',
          default: 'CURRENT_TIMESTAMP',
        },
      ],
    }),
    true
  );
}

async function createCarsTable(queryRunner: QueryRunner) {
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
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'updated_at',
          type: 'dateTime',
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'deleted_at',
          type: 'dateTime',
          default: 'CURRENT_TIMESTAMP',
        },
      ],
    }),
    true
  );
}

async function createReservationsTable(queryRunner: QueryRunner) {
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
          name: 'client_id',
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
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'updated_at',
          type: 'dateTime',
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'deleted_at',
          type: 'dateTime',
          default: 'CURRENT_TIMESTAMP',
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

async function createPermissionsTable(queryRunner: QueryRunner) {
  await queryRunner.createTable(
    new Table({
      name: 'permissions',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          generationStrategy: 'increment',
        },
        {
          name: 'role_id',
          type: 'int',
        },
        {
          name: 'permission_id',
          type: 'int',
        },
        {
          name: 'created_at',
          type: 'dateTime',
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'updated_at',
          type: 'dateTime',
          default: 'CURRENT_TIMESTAMP',
        },
      ],
    }),
    true
  );

  await queryRunner.createForeignKey(
    'permissions',
    new TableForeignKey({
      columnNames: ['role_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'roles',
    })
  );

  await queryRunner.createUniqueConstraint(
    'permissions',
    new TableUnique({
      columnNames: ['role_id', 'permission_id'],
      name: 'permissions_unique_role_id_and_permission_id',
    })
  );
}

export class skeleton1615682148699 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await createRolesTable(queryRunner);
    await createUsersTable(queryRunner);
    await createPermissionsTable(queryRunner);
    await createClientsTable(queryRunner);
    await createCarsTable(queryRunner);
    await createReservationsTable(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('permissions');
    await queryRunner.dropTable('roles');
    await queryRunner.dropTable('users');
    await queryRunner.dropTable('reservations');
    await queryRunner.dropTable('clients');
    await queryRunner.dropTable('cars');
  }
}
