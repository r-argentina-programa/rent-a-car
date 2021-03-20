import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { ReservationTypeormRepository } from './infrastructure/database/reservation.typeorm.repository';
import { ReserveCarHttpController } from './interface-adapter/use-cases/reserve-car/reserve-car.http.controller';
import { ReservationService } from './application/reservation.service';
import { GetStatusesHttpController } from './interface-adapter/use-cases/get-statuses/get-statuses.http.controller';
import { GetReservationHttpController } from './interface-adapter/use-cases/get-reservation/get-reservation.http.controller';
import { GetReservationsHttpController } from './interface-adapter/use-cases/get-reservations/get-reservations.http.controller';

@Module({
  imports: [],
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
