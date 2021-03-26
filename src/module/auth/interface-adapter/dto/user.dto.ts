import { Role } from '../../application/entity/role.entity';
import { User } from '../../application/entity/user.entity';

export class UserDto {
  public id: number;

  public username: string;

  public externalId: string;

  public role: Role;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.role = user.role;
  }

  toJSON() {
    const { id, externalId, username } = this;
    return {
      id,
      externalId,
      username,
      role: this.role.toJSON(),
    };
  }
}
