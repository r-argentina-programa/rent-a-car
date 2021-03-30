import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import { ValidationPipe } from '@common/interface-adapter/validation.pipe';
import { BaseController } from '@common/application/base.controller';
import { Car } from '../domain/car.entity';
import { CarService } from '../application/car.service';
import { SaveCarRequestDto } from './save-car.request.dto';
import { mapRequestToEntity } from './car.mapper';
import { RequirePolicies } from '../../auth/interface-adapter/decorator/auth.decorator.require-policies';
import { Policy } from '../../auth/application/entity/policy';
import { AuthAction } from '../../auth/application/entity/auth.action';

@Controller('cars')
export class CarController extends BaseController {
  constructor(private service: CarService) {
    super();
  }

  @Get(':id')
  @RequirePolicies([new Policy(AuthAction.Retrieve, 'Car')])
  getCar(@Param() params): Promise<Car> {
    return this.service.findOne(Number(params.id));
  }

  @Get()
  @RequirePolicies([new Policy(AuthAction.Retrieve, 'Car')])
  getCars(): Promise<Car[]> {
    return this.service.findAll();
  }

  @RequirePolicies([new Policy(AuthAction.Create, 'Car')])
  @Post()
  saveCar(@Body(new ValidationPipe()) car: SaveCarRequestDto): Promise<Car> {
    return this.service.save(mapRequestToEntity(car));
  }

  @RequirePolicies([new Policy(AuthAction.Create, 'Car')])
  @Delete(':id')
  async deleteCar(@Param() params): Promise<Car> {
    const { id } = params;
    try {
      // si no se pone 'await' en esta línea, el error nunca es atrapado
      // https://itnext.io/error-handling-with-async-await-in-js-26c3f20bc06a
      return await this.service.deleteById(Number(id));
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `No se encontró el auto con id ${id}`,
          },
          HttpStatus.NOT_FOUND
        );
      } else {
        throw e;
      }
    }
  }
}
