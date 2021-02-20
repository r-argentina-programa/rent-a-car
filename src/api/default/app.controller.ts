import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IReservationStatuses, ReservationStatuses } from '../reservation/ReservationStatus';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('reservation-statuses')
  getStatuses(): IReservationStatuses {
    return ReservationStatuses;
  }
}
