import { Reservation } from '../../domain/reservation.entity';
import { BaseSchema } from '../../../../common/infrastructure/database/base.schema';
import { Car } from '../../../car/car.entity';
import { User } from '../../../user/user.entity';

export const ReservationSchema = new BaseSchema<Reservation>({
  name: 'Reservation',
  target: Reservation,
  tableName: 'reservations',
  columns: {
    startDate: {
      type: 'date',
      name: 'start_date',
    },
    finishDate: {
      type: 'date',
      name: 'finish_date',
    },
    carId: {
      type: 'integer',
      name: 'car_id',
    },
    pricePerDay: {
      type: 'integer',
      name: 'price_per_day',
    },
    totalPrice: {
      type: 'integer',
      name: 'total_price',
    },
    paymentMethod: {
      type: 'integer',
      name: 'payment_method',
    },
    statusId: {
      type: 'integer',
      name: 'status',
    },
  },
  relations: {
    car: {
      type: 'many-to-one',
      target: () => Car,
      inverseSide: 'reservations',
      joinColumn: {
        name: 'car_id',
      },
    },
    user: {
      type: 'many-to-one',
      target: () => User,
      inverseSide: 'users',
      joinColumn: {
        name: 'user_id',
      },
    },
  },
});
