import { Car } from '../domain/car.entity';

export interface ICarRepository {
  find(): Promise<Car[]>;

  findOneOrFail(id: number | string): Promise<Car>;
}
