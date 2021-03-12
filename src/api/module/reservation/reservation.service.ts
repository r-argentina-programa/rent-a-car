import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { ReservationRepository } from './reservation.repository';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationRepository)
    private repository: ReservationRepository
  ) {}

  async findOne(id: number): Promise<Reservation> {
    return this.repository.findOneOrFail(id, { relations: ['car'] });
  }

  findAll(): Promise<Reservation[]> {
    return this.repository.find({ relations: ['car'] });
  }
}
