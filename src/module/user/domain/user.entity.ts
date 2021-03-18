import * as bcrypt from 'bcrypt';
import { BaseEntity } from '../../../common/domain/base.entity';
import { Role } from '../../auth/application/role.entity';

export class User extends BaseEntity {
  public role: Role;

  public username: string;

  #password: string;

  get password(): string {
    return this.#password;
  }

  set password(password: string) {
    const salt = bcrypt.genSaltSync(10);
    this.#password = bcrypt.hashSync(password, salt);
  }
}
