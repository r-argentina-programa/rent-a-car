import { BaseSchema } from '../../../../common/infrastructure/database/base.schema';
import { Role } from '../../application/entity/role.entity';
import { Permission } from '../../application/entity/permission.entity';

export const PermissionSchema = new BaseSchema<Permission>({
  name: 'Permission',
  target: Permission,
  tableName: 'permissions',
  columns: {
    action: {
      type: String,
      name: 'action',
    },
    subject: {
      type: String,
      name: 'subject',
    },
  },
  relations: {
    role: {
      type: 'many-to-one',
      target: () => Role,
      inverseSide: 'permissions',
      joinColumn: {
        name: 'role_id',
      },
    },
  },
});
