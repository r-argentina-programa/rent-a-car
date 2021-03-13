import { Expose } from 'class-transformer';
import { ReservationStatus } from './reservation.status';
import { BaseEntity } from '../../../common/domain/base.entity';
import { Car } from '../../car/car.entity';
import { ReservationStatuses } from './reservation.statuses';
import { User } from '../../user/user.entity';

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

  user: User;

  @Expose()
  get status(): ReservationStatus {
    const statusesList: Array<ReservationStatus> = Object.values(ReservationStatuses);
    return statusesList.find((status) => status.value === Number(this.statusId));
  }
}
