import { UserSchema } from './src/module/user/infrastructure/database/user.schema';
import { RoleSchema } from './src/module/auth/infrastructure/database/role.schema';
import { PermissionSchema } from './src/module/auth/infrastructure/database/permission.schema';

export default {
  name: 'default',
  type: 'sqlite',
  database: process.env.DB_PATH,
  logging: true,
  entities: [UserSchema, RoleSchema, PermissionSchema],
};
