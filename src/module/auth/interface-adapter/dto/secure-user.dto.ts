import { SecureUser } from '../../application/entity/secure-user.entity';

export class SecureUserDto {
  constructor(private user: SecureUser) {}

  toJSON() {
    const { id, username, ...user } = this.user;
    return {
      id,
      username,
      role: user.role.toJSON(),
    };
  }
}
