import { Controller, Get, Param } from '@nestjs/common';
import { Car } from '../domain/car.entity';
import { CarService } from '../application/car.service';
import { BaseController } from '../../../common/application/base.controller';

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
