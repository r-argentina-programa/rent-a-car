import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '@config/ormconfig';
import { APP_GUARD } from '@nestjs/core';
import { CarModule } from './car/car.module';
import { ReservationModule } from './reservation/reservation.module';
import { AuthModule } from './auth/auth.module';
import { PolicyAuthGuard } from './auth/infrastructure/guard/policy.auth.guard';
import { logger } from '../common/infrastructure/logger.middleware';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), AuthModule, CarModule, ReservationModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PolicyAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(logger).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
