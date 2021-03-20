import { Injectable } from '@nestjs/common';
import { Car } from '../domain/car.entity';
import { ICarRepository } from './car.repository.interface';

export class CarService {
  constructor(private repository: ICarRepository) {}

  async findOne(id: number): Promise<Car> {
    return this.repository.findOneOrFail(id);
  }

  findAll(): Promise<Car[]> {
    return this.repository.find();
  }
}
