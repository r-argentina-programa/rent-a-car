import { EntityRepository, Repository } from 'typeorm';
import { Car } from './car.entity';
import { CarSchema } from './car.schema';

@EntityRepository(CarSchema)
export class CarRepository extends Repository<Car> {}
