import { Expose } from 'class-transformer';
import { ReservationStatus } from './reservation.status';
import { BaseEntity } from '../../../common/domain/base.entity';
import { Car } from '../../car/car.entity';
import { ReservationStatuses } from './reservation.statuses';
import { Client } from '../../client/client.entity';

export class Reservation extends BaseEntity {
  startDate: Date;

  finishDate: Date;

  pricePerDay: number;

  totalPrice: number;

  paymentMethod: string;

  statusId: number;

  car: Car;

  client: Client;

  @Expose()
  get status(): ReservationStatus {
    const statusesList: Array<ReservationStatus> = Object.values(ReservationStatuses);
    return statusesList.find((status) => status.value === Number(this.statusId));
  }
}
