import { Car } from '../domain/car.entity';
import { IBaseRepository } from '../../../common/application/base.repository.interface';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICarRepository extends IBaseRepository<Car> {}
