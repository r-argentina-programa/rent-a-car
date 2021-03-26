import { UserSchema } from './src/module/auth/infrastructure/database/user.schema';

export default {
  name: 'default',
  type: 'sqlite',
  database: process.env.DB_PATH,
  logging: true,
  entities: [UserSchema],
  migrations: ['./data/migration/**/*.ts'],
  cli: {
    migrationsDir: ['./data/migration'],
  },
};
