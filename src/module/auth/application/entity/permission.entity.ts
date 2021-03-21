import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../../common/infrastructure/base.entity';
import { Role } from './role.entity';
import { AuthAction } from './auth.action';

export class Permission extends BaseEntity {
  public role: Role;

  public action: AuthAction;

  public subject: string;

  toJSON(): Permission {
    return {
      ...super.toJSON(),
      action: this.action,
      subject: this.subject,
    } as Permission;
  }
}
