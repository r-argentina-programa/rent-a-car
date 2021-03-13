import { Inject, Injectable } from '@nestjs/common';
import { Reservation } from '../domain/reservation.entity';
import { IReservationRepository } from './reservation.repository.interface';

@Injectable()
export class ReservationService {
  constructor(@Inject('IReservationRepository') private repository: IReservationRepository) {}

  async findOne(id: number): Promise<Reservation> {
    return this.repository.findOneOrFail(id);
  }

  findAll(): Promise<Reservation[]> {
    return this.repository.find();
  }
}
