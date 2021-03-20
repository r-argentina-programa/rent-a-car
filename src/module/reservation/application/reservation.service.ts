import { Reservation } from '../domain/reservation.entity';
import { IReservationRepository } from './reservation.repository.interface';

export class ReservationService {
  constructor(private repository: IReservationRepository) {}

  async findOne(id: number): Promise<Reservation> {
    return this.repository.findOneOrFail(id);
  }

  findAll(): Promise<Reservation[]> {
    return this.repository.find();
  }
}
