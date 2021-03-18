import { User } from '../../domain/user.entity';
import { BaseSchema } from '../../../../common/infrastructure/database/base.schema';
import { Role } from '../../../auth/application/role.entity';

export const UserSchema = new BaseSchema<User>({
  name: 'User',
  tableName: 'users',
  target: User,
  columns: {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  relations: {
    role: {
      type: 'many-to-one',
      target: () => Role,
      joinColumn: {
        name: 'role_id',
        referencedColumnName: 'id',
      },
    },
  },
});
