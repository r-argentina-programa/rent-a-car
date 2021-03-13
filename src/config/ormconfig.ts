import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config();

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: process.env.DB_PATH,
  entities: [],
  autoLoadEntities: true,
  logging: 'all',
};
