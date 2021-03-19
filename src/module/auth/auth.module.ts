import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@config/auth';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './application/auth.service';
import { AuthStrategyLocal } from './application/strategy/auth.strategy.local';
import { AuthStrategyJwt } from './application/strategy/auth.strategy.jwt';
import { CaslAbilityFactory } from './infrastructure/casl/casl.ability.factorty';
import { UserRepository } from './infrastructure/database/user.repository';
import { UserController } from './interface-adapter/user.controller';
import { UserService } from './application/user.service';
import { AuthController } from './interface-adapter/auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expirationTime },
      verifyOptions: {
        ignoreExpiration: process.env.NODE_ENV !== 'production',
      },
    }),
  ],
  controllers: [UserController, AuthController],
  providers: [AuthService, AuthStrategyLocal, AuthStrategyJwt, CaslAbilityFactory, UserService],
  exports: [AuthService, CaslAbilityFactory],
})
export class AuthModule {}
