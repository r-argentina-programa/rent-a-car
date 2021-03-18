import { BaseEntity } from '../../../common/infrastructure/base.entity';
import { Role } from './role.entity';
import { AuthAction } from './auth.action';

export class Permission extends BaseEntity {
  public role: Role;

  public permission: AuthAction;
}
