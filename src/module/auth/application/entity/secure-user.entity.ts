import { Role } from './role.entity';
import { User } from './user.entity';

export class SecureUser {
  public id: number;

  public username: string;

  public role: Role;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.role = user.role;
  }

  toJSON() {
    const { id, username } = this;
    return {
      id,
      username,
      role: this.role.toJSON(),
    };
  }
}
