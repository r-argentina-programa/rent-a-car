import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@config/auth';
import { UserModule } from '../user/user.module';
import { AuthService } from './application/auth.service';
import { AuthStrategyLocal } from './application/strategy/auth.strategy.local';
import { AuthStrategyJwt } from './application/strategy/auth.strategy.jwt';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expirationTime },
    }),
  ],
  providers: [AuthService, AuthStrategyLocal, AuthStrategyJwt],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
