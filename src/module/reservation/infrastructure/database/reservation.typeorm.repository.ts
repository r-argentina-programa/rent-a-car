import { AbstractRepository, EntityRepository } from 'typeorm';
import { Reservation } from '../../domain/reservation.entity';
import { IReservationRepository } from '../../application/reservation.repository.interface';
import { ReservationSchema } from './reservation.schema';

@EntityRepository(ReservationSchema)
export class ReservationTypeormRepository extends AbstractRepository<Reservation>
  implements IReservationRepository {
  find(): Promise<Reservation[]> {
    return this.repository.find({ relations: ['car'] });
  }

  findOneOrFail(id: string | number): Promise<Reservation> {
    return this.repository.findOneOrFail(id, { relations: ['car', 'user'] });
  }

  delete(entity: Reservation): Promise<boolean> {
    return Promise.resolve(false);
  }

  save(entity: Reservation): Promise<Reservation> {
    return Promise.resolve(undefined);
  }

  softDelete(entity: Reservation): Promise<Reservation> {
    return Promise.resolve(undefined);
  }
}
