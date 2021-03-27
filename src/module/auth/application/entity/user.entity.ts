import { BaseEntity } from '../../../../common/domain/base.entity';
import { Role } from './role.entity';

export class User extends BaseEntity {
  public role: Role;

  public username: string;

  public externalId: string;
}
