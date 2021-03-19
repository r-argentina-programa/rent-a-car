import { Controller, Get, Param } from '@nestjs/common';
import { BaseController } from '../../../../../common/application/base.controller';
import { Reservation } from '../../../domain/reservation.entity';
import { ReservationService } from '../../../application/reservation.service';

@Controller('/reservations')
export class ReserveCarHttpController extends BaseController {
  constructor(private service: ReservationService) {
    super();
  }
}
