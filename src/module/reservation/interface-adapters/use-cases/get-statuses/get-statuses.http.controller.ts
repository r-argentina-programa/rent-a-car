import { Controller, Get } from '@nestjs/common';
import { BaseController } from '../../../../../common/application/base.controller';
import { ReservationStatuses } from '../../../domain/reservation.statuses';
import { IReservationStatuses } from '../../../domain/reservation.statuses.interface';
import routes from '../../../../../config/routes';

@Controller(routes.reservation.root)
export class GetStatusesHttpController extends BaseController {
  @Get(routes.reservation.getStatuses)
  getStatuses(): IReservationStatuses {
    return ReservationStatuses;
  }
}
