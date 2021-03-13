import { User } from './user.entity';
import { BaseSchema } from '../../common/infrastructure/database/base.schema';
import { Reservation } from '../reservation/domain/reservation.entity';

export const UserSchema = new BaseSchema<User>({
  name: 'User',
  target: User,
  tableName: 'users',
  columns: {
    address: {
      type: String,
    },
    birthdate: {
      type: 'date',
    },
    email: {
      type: String,
    },
    firstName: {
      type: String,
      name: 'first_name',
    },
    lastName: {
      type: String,
      name: 'last_name',
    },
    idType: {
      type: String,
      name: 'id_type',
    },
    idNumber: {
      type: String,
      name: 'id_number',
    },
    phoneNumber: {
      type: String,
      name: 'phone_number',
    },
    nationality: {
      type: String,
    },
  },
  relations: {
    reservations: {
      type: 'one-to-many',
      target: () => Reservation,
      inverseSide: 'user',
      joinColumn: {
        name: 'user_id',
      },
    },
  },
});
