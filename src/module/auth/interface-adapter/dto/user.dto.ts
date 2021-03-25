import { Role } from '../../application/entity/role.entity';
import { User } from '../../application/entity/user.entity';

export class UserDto {
  public id: number;

  public username: string;

  public role: Role;

  constructor(private user: User) {
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
