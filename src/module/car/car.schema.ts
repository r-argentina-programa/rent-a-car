import { Car } from './car.entity';
import { BaseSchema } from '../../common/infrastructure/database/base.schema';
import { Reservation } from '../reservation/domain/reservation.entity';

export const CarSchema = new BaseSchema<Car>({
  name: 'Car',
  target: Car,
  tableName: 'cars',
  columns: {
    ac: {
      type: Boolean,
    },
    brand: {
      type: String,
    },
    color: {
      type: String,
    },
    img: {
      type: String,
    },
    kms: {
      type: Number,
    },
    model: {
      type: String,
    },
    passengers: {
      type: Number,
    },
    price: {
      type: Number,
    },
    transmission: {
      type: String,
    },
    year: {
      type: Number,
    },
  },
  relations: {
    reservations: {
      type: 'one-to-many',
      target: () => Reservation,
      inverseSide: 'car',
      joinColumn: {
        name: 'car_id',
      },
    },
  },
});
