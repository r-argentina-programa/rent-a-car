import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { ReservationTypeormRepository } from './infrastructure/database/reservation.typeorm.repository';
import { ReserveCarHttpController } from './interface-adapter/use-case/reserve-car/reserve-car.http.controller';
import { ReservationService } from './application/reservation.service';
import { GetStatusesHttpController } from './interface-adapter/use-case/get-statuses/get-statuses.http.controller';
import { GetReservationHttpController } from './interface-adapter/use-case/get-reservation/get-reservation.http.controller';
import { GetReservationsHttpController } from './interface-adapter/use-case/get-reservations/get-reservations.http.controller';
import { IReservationRepository } from './application/reservation.repository.interface';

@Module({
  imports: [],
  controllers: [
    GetStatusesHttpController,
    GetReservationHttpController,
    GetReservationsHttpController,
    ReserveCarHttpController,
  ],
  providers: [
    {
      provide: 'IReservationRepository',
      useFactory: (connection: Connection) =>
        connection.getCustomRepository(ReservationTypeormRepository),
      inject: [Connection],
    },
    {
      provide: ReservationService,
      useFactory: (repository: IReservationRepository) => new ReservationService(repository),
      inject: ['IReservationRepository'],
    },
  ],
})
export class ReservationModule {}
