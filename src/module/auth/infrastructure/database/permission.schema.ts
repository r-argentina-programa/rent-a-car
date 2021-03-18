import { BaseSchema } from '../../../../common/infrastructure/database/base.schema';
import { Role } from '../../application/role.entity';
import { Permission } from '../../application/permission.entity';

export const PermissionSchema = new BaseSchema<Permission>({
  name: 'Permission',
  target: Permission,
  tableName: 'permissions',
  columns: {
    permission: {
      type: 'integer',
      name: 'permission_id',
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
