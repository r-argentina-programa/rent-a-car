import { config } from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { UserSchema } from '../module/user/infrastructure/database/user.schema';
import { RoleSchema } from '../module/auth/infrastructure/database/role.schema';
import { ReservationSchema } from '../module/reservation/infrastructure/database/reservation.schema';
import { CarSchema } from '../module/car/car.schema';
import { ClientSchema } from '../module/client/client.schema';
import { BaseSchema } from '../common/infrastructure/database/base.schema';

config();

export const typeormConfig: TypeOrmModuleOptions = {
  type: process.env.DB_DRIVER,
  database: process.env.DB_PATH,
  logging: 'all',
  entities: [BaseSchema, UserSchema, RoleSchema, ReservationSchema, CarSchema, ClientSchema],
} as Partial<ConnectionOptions>;
