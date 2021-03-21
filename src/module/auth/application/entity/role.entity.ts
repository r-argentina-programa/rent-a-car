import { BaseEntity } from '../../../../common/infrastructure/base.entity';
import { Permission } from './permission.entity';

export class Role extends BaseEntity {
  public name: string;

  public permissions: Permission[];

  toJSON(): Role {
    return {
      ...super.toJSON(),
      name: this.name,
      permissions: this.permissions.map((permission) => permission.toJSON()),
    } as Role;
  }
}
