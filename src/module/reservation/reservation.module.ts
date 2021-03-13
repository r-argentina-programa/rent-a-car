import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ReservationTypeormRepository } from './infrastructure/database/reservation.typeorm.repository';
import { ReserveCarHttpController } from './interface-adapters/use-cases/reserve-car/reserve-car.http.controller';
import { ReservationService } from './application/reservation.service';
import { GetStatusesHttpController } from './interface-adapters/use-cases/get-statuses/get-statuses.http.controller';
import { GetReservationHttpController } from './interface-adapters/use-cases/get-reservation/get-reservation.http.controller';
import { GetReservationsHttpController } from './interface-adapters/use-cases/get-reservations/get-reservations.http.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationTypeormRepository])],
  controllers: [
    GetStatusesHttpController,
    GetReservationHttpController,
    GetReservationsHttpController,
    ReserveCarHttpController,
  ],
  providers: [
    ReservationService,
    {
      provide: 'IReservationRepository',
      useFactory: (connection: Connection) =>
        connection.getCustomRepository(ReservationTypeormRepository),
      inject: [Connection],
    },
  ],
})
export class ReservationModule {}
