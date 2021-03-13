import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultController } from './default/default.controller';
import { typeormConfig } from '../config/ormconfig';
import { CarModule } from './car/car.module';
import { ReservationModule } from './reservation/reservation.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), CarModule, UserModule, ReservationModule],
  controllers: [DefaultController],
  providers: [],
})
export class AppModule {}
