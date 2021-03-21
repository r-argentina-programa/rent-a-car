import { SecureUser } from '../../application/entity/secure-user.entity';
import { Role } from '../../application/entity/role.entity';

export class SecureUserDto {
  public id: number;

  public username: string;

  public role: Role;

  constructor(private user: SecureUser) {
    this.id = this.user.id;
    this.username = this.user.username;
    this.role = this.user.role;
  }

  toJSON() {
    const { id, username, ...user } = this.user;
    return {
      id,
      username,
      role: user.role.toJSON(),
    };
  }
}
