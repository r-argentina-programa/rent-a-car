import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { comparePasswords } from './helper/encryption.helper';
import { User } from './entity/user.entity';
import { SecureUserDto } from '../interface-adapter/dto/secure-user.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && comparePasswords(password, user.password)) {
      return user;
    }
    return null;
  }

  getAccessToken(user: SecureUserDto): string {
    return this.jwtService.sign(user.toJSON());
  }
}
