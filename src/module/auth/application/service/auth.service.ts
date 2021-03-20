import { UserService } from './user.service';
import { comparePasswords } from '../helper/encryption.helper';
import { IWebTokenService } from './web-token.service.interface';
import { SecureUser } from '../entity/secure-user.entity';

export class AuthService {
  constructor(private usersService: UserService, private webTokenService: IWebTokenService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && comparePasswords(password, user.password)) {
      return user;
    }
    return null;
  }

  getAccessToken(user: SecureUser): string {
    return this.webTokenService.getAccessToken(user.toJSON());
  }
}
