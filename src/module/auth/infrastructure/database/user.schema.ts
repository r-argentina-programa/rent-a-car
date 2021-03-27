import { User } from '../../application/entity/user.entity';
import { BaseSchema } from '../../../../common/infrastructure/database/base.schema';

export const UserSchema = new BaseSchema<User>({
  name: 'User',
  tableName: 'users',
  target: User,
  columns: {
    username: {
      type: String,
    },
    externalId: {
      type: String,
      name: 'external_id',
    },
  },
});
