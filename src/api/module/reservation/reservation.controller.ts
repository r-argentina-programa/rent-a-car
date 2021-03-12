import { Controller, Get, Param } from '@nestjs/common';
import { BaseController } from '../../common/base.controller';
import { Reservation } from './reservation.entity';
import { ReservationService } from './reservation.service';
import { IReservationStatuses, ReservationStatuses } from './ReservationStatus';

@Controller('reservations')
export class ReservationController extends BaseController {
  constructor(private service: ReservationService) {
    super();
  }

  @Get('statuses')
  getStatuses(): IReservationStatuses {
    return ReservationStatuses;
  }

  @Get(':id')
  getCar(@Param() params): Promise<Reservation> {
    return this.service.findOne(Number(params.id));
  }

  @Get()
  getCars(): Promise<Reservation[]> {
    return this.service.findAll();
  }
}
