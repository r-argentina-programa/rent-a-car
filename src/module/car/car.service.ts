import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { CarRepository } from './car.repository';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarRepository)
    private repository: CarRepository
  ) {}

  async findOne(id: number): Promise<Car> {
    return this.repository.findOneOrFail(id, { relations: ['reservations'] });
  }

  findAll(): Promise<Car[]> {
    return this.repository.find();
  }
}
