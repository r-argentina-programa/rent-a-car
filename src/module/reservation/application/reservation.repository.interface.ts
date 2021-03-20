import { Reservation } from '../domain/reservation.entity';
import { IBaseRepository } from '../../../common/application/base.repository.interface';

export type IReservationRepository = IBaseRepository<Reservation>;
