import { BaseEntity } from '../../../../common/domain/base.entity';
import { Role } from './role.entity';
import { encryptPassword } from '../helper/encryption.helper';

export class User extends BaseEntity {
  public role: Role;

  public username: string;

  password: string;

  setPassword(password: string) {
    this.password = encryptPassword(password);
  }
}
