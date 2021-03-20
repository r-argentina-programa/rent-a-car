import { Reservation } from '../domain/reservation.entity';

export interface IReservationRepository {
  findOneOrFail(id: string | number): Promise<Reservation>;

  find(): Promise<Reservation[]>;
}
