import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '@config/ormconfig';
import { APP_GUARD } from '@nestjs/core';
import { CarModule } from './car/car.module';
import { ReservationModule } from './reservation/reservation.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/interface-adapter/auth.controller';
import { PolicyAuthGuard } from './auth/application/guard/policy.auth.guard';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), AuthModule, CarModule, ReservationModule],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PolicyAuthGuard,
    },
  ],
})
export class AppModule {}
