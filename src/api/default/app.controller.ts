import { Controller, Get } from '@nestjs/common';
import { IReservationStatuses, ReservationStatuses } from '../reservation/ReservationStatus';

@Controller()
export class AppController {
  @Get('reservation-statuses')
  getStatuses(): IReservationStatuses {
    return ReservationStatuses;
  }
}
