import { Controller, Get, Param } from '@nestjs/common';
import { Car } from './car.entity';
import { CarService } from './car.service';
import { BaseController } from '../../common/base.controller';

@Controller('cars')
export class CarController extends BaseController {
  constructor(private service: CarService) {
    super();
  }

  @Get(':id')
  getCar(@Param() params): Promise<Car> {
    return this.service.findOne(Number(params.id));
  }

  @Get()
  getCars(): Promise<Car[]> {
    return this.service.findAll();
  }
}
