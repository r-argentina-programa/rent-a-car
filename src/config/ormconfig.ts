import { config } from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';

config();

export const typeormConfig: TypeOrmModuleOptions = {
  type: process.env.TYPEORM_CONNECTION,
  database: process.env.TYPEORM_DATABASE,
  autoLoadEntities: true,
  logging: 'all',
  entities: [],
} as Partial<ConnectionOptions>;
