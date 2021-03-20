import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Connection } from 'typeorm';
import { AuthService } from './application/service/auth.service';
import { AuthStrategyLocal } from './infrastructure/strategy/auth.strategy.local';
import { AuthStrategyJwt } from './infrastructure/strategy/auth.strategy.jwt';
import { CaslAbilityFactory } from './infrastructure/casl/casl.ability.factorty';
import { UserTypeormRepository } from './infrastructure/database/user.typeorm.repository';
import { UserController } from './interface-adapter/user.controller';
import { UserService } from './application/service/user.service';
import { AuthController } from './interface-adapter/auth.controller';
import { NestJwtService } from './infrastructure/jwt/nest.jwt.service';
import { IWebTokenService } from './application/service/web-token.service.interface';
import { IUserRepository } from './application/repository/user.repository.interface';

@Module({
  imports: [PassportModule],
  controllers: [UserController, AuthController],
  providers: [
    {
      provide: AuthService,
      useFactory: (userService: UserService, webTokenService: IWebTokenService) =>
        new AuthService(userService, webTokenService),
      inject: [UserService, 'IWebTokenService'],
    },
    {
      provide: UserService,
      useFactory: (userRepository: IUserRepository) => new UserService(userRepository),
      inject: ['IUserRepository'],
    },
    AuthStrategyLocal,
    AuthStrategyJwt,
    CaslAbilityFactory,
    {
      provide: 'IWebTokenService',
      useFactory: () => new NestJwtService(),
    },
    {
      provide: 'IUserRepository',
      useFactory: (connection: Connection) => connection.getCustomRepository(UserTypeormRepository),
      inject: [Connection],
    },
  ],
  exports: [AuthService, CaslAbilityFactory],
})
export class AuthModule {}
