import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '@config/ormconfig';
import { DefaultController } from './default/default.controller';
import { CarModule } from './car/car.module';
import { ReservationModule } from './reservation/reservation.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    CarModule,
    UserModule,
    ReservationModule,
    AuthModule,
  ],
  controllers: [DefaultController],
  providers: [],
})
export class AppModule {}
