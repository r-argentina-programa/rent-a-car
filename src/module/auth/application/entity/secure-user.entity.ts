import { Role } from './role.entity';
import { User } from './user.entity';

export class SecureUser {
  public id: number;

  public username: string;

  public role: Role;

  readonly #user: User;

  constructor(user: User) {
    this.#user = user;
    this.id = this.#user.id;
    this.username = this.#user.username;
    this.role = this.#user.role;
  }

  toJSON() {
    const { id, username, ...user } = this.#user;
    return {
      id,
      username,
      role: user.role.toJSON(),
    };
  }
}