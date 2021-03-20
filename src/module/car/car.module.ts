import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { CarController } from './interface-adapter/car.controller';
import { CarService } from './application/car.service';
import { CarTypeormRepository } from './infrastructure/database/car.typeorm.repository';
import { ICarRepository } from './application/car.repository.interface';

@Module({
  imports: [],
  controllers: [CarController],
  providers: [
    {
      provide: 'ICarRepository',
      useFactory: (connection: Connection) => connection.getCustomRepository(CarTypeormRepository),
      inject: [Connection],
    },
    {
      provide: CarService,
      useFactory: (repository: ICarRepository) => new CarService(repository),
      inject: ['ICarRepository'],
    },
  ],
})
export class CarModule {}
