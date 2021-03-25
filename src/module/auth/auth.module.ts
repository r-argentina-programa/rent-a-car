import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Connection } from 'typeorm';
import { AuthStrategyJwt } from './infrastructure/strategy/auth.strategy.jwt';
import { CaslAbilityFactory } from './infrastructure/casl/casl.ability.factorty';
import { UserTypeormRepository } from './infrastructure/database/user.typeorm.repository';
import { UserController } from './interface-adapter/user.controller';
import { UserService } from './application/service/user.service';
import { IUserRepository } from './application/repository/user.repository.interface';

@Module({
  imports: [PassportModule],
  controllers: [UserController],
  providers: [
    {
      provide: UserService,
      useFactory: (userRepository: IUserRepository) => new UserService(userRepository),
      inject: ['IUserRepository'],
    },
    AuthStrategyJwt,
    CaslAbilityFactory,
    {
      provide: 'IUserRepository',
      useFactory: (connection: Connection) => connection.getCustomRepository(UserTypeormRepository),
      inject: [Connection],
    },
  ],
  exports: [CaslAbilityFactory],
})
export class AuthModule {}
