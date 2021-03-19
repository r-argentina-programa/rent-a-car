import { BaseSchema } from '../../../../common/infrastructure/database/base.schema';
import { Role } from '../../application/entity/role.entity';
import { Permission } from '../../application/entity/policy.entity';

export const RoleSchema = new BaseSchema<Role>({
  name: 'Role',
  target: Role,
  tableName: 'roles',
  columns: {
    name: {
      type: String,
    },
  },
  relations: {
    permissions: {
      type: 'one-to-many',
      target: () => Permission,
      inverseSide: 'role',
      joinColumn: {
        name: 'role_id',
      },
    },
  },
});
