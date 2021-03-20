import { AbstractRepository, EntityRepository } from 'typeorm';
import { Car } from '../../domain/car.entity';
import { CarSchema } from './car.schema';
import { ICarRepository } from '../../application/car.repository.interface';

@EntityRepository(CarSchema)
export class CarTypeormRepository extends AbstractRepository<Car> implements ICarRepository {
  findOneOrFail(id: number | string): Promise<Car> {
    return this.repository.findOneOrFail(id, { relations: ['reservations'] });
  }

  find(): Promise<Car[]> {
    return this.repository.find();
  }

  delete(entity: Car): Promise<boolean> {
    return Promise.resolve(false);
  }

  save(entity: Car): Promise<Car> {
    return Promise.resolve(undefined);
  }

  softDelete(entity: Car): Promise<Car> {
    return Promise.resolve(undefined);
  }
}
