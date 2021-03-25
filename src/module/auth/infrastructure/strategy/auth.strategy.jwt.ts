import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { passportJwtSecret } from 'jwks-rsa';
import { Auth0UserDto, mapUser, populatePermissions } from '../auth0/user.mapper';
import { User } from '../../application/entity/user.entity';
import { UserService } from '../../application/service/user.service';

@Injectable()
export class AuthStrategyJwt extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_ISSUER_URL}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: process.env.AUTH0_ISSUER_URL,
      algorithms: ['RS256'],
    });
  }

  async validate(auth0UserDto: Auth0UserDto): Promise<User> {
    const user = await this.userService.findOneByExternalId(auth0UserDto.sub);

    if (user) {
      return populatePermissions(user, auth0UserDto);
    }

    const newUser = await this.userService.create(mapUser(auth0UserDto));
    return populatePermissions(newUser, auth0UserDto);
  }
}
