import { Expose } from 'class-transformer';
import { ReservationStatus, ReservationStatuses } from './ReservationStatus';
import { BaseEntity } from '../../common/base.entity';
import { Car } from '../car/car.entity';

export class Reservation extends BaseEntity {
  startDate: Date;

  finishDate: Date;

  pricePerDay: number;

  totalPrice: number;

  paymentMethod: string;

  carId: number;

  userId: number;

  statusId: number;

  car: Car;

  @Expose()
  get status(): ReservationStatus {
    const statusesList: Array<ReservationStatus> = Object.values(ReservationStatuses);
    return statusesList.find((status) => status.value === Number(this.statusId));
  }
}
