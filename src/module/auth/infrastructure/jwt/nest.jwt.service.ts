import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '@config/auth';
import { IWebTokenService } from '../../application/service/web-token.service.interface';

export class NestJwtService extends JwtService implements IWebTokenService {
  constructor() {
    super({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expirationTime },
      verifyOptions: {
        ignoreExpiration: process.env.NODE_ENV !== 'production',
      },
    });
  }

  getAccessToken(data: any): string {
    return this.sign(data);
  }
}
