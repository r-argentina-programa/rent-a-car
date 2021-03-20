import { Car } from '../domain/car.entity';
import { IBaseRepository } from '../../../common/application/base.repository.interface';

export type ICarRepository = IBaseRepository<Car>;
