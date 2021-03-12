import { EntityRepository, Repository } from 'typeorm';
import { ReservationSchema } from './reservation.schema';
import { Reservation } from './reservation.entity';

@EntityRepository(ReservationSchema)
export class ReservationRepository extends Repository<Reservation> {}
