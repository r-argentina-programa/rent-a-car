import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultController } from './module/default/default.controller';
import { typeormConfig } from './config/ormconfig';
import { CarModule } from './module/car/car.module';
import { ReservationModule } from './module/reservation/reservation.module';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), CarModule, UserModule, ReservationModule],
  controllers: [DefaultController],
  providers: [],
})
export class AppModule {}
