import { BaseSchema } from '../../../../common/infrastructure/database/base.schema';
import { Role } from '../../application/role.entity';

export const RoleSchema = new BaseSchema<Role>({
  name: 'roles',
  target: Role,
  tableName: 'roles',
  columns: {
    name: {
      type: String,
    },
  },
});
