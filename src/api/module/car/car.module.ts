import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { CarRepository } from './car.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CarRepository])],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
