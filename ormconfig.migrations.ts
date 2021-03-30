import { UserSchema } from './src/module/auth/infrastructure/database/user.schema';
import { RoleSchema } from './src/module/auth/infrastructure/database/role.schema';
import { PermissionSchema } from './src/module/auth/infrastructure/database/permission.schema';
import { ReservationSchema } from './src/module/reservation/infrastructure/database/reservation.schema';
import { CarSchema } from './src/module/car/infrastructure/database/car.schema';
import { ClientSchema } from './src/module/client/client.schema';

export default {
  name: 'default',
  type: 'sqlite',
  database: process.env.DB_PATH,
  logging: true,
  entities: [UserSchema, RoleSchema, PermissionSchema, CarSchema, ReservationSchema, ClientSchema],
  migrations: ['./data/migration/**/*.ts'],
  cli: {
    migrationsDir: ['./data/migration'],
  },
};
