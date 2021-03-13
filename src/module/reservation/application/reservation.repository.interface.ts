import { Reservation } from '../domain/reservation.entity';

export interface IReservationRepository {
  findOneOrFail(id: string): Promise<Reservation>;

  findOneOrFail(id: number): Promise<Reservation>;

  find(): Promise<Reservation[]>;
}
