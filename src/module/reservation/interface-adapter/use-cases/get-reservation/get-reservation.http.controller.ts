import { Controller, Get, Inject, Param } from '@nestjs/common';
import { BaseController } from '../../../../../common/application/base.controller';
import { Reservation } from '../../../domain/reservation.entity';
import { GetReservationRequest } from './get-reservation.request.dto';
import { IReservationRepository } from '../../../application/reservation.repository.interface';
import routes from '../../../../../config/routes';

@Controller(routes.reservation.root)
export class GetReservationHttpController extends BaseController {
  constructor(@Inject('IReservationRepository') private repository: IReservationRepository) {
    super();
  }

  @Get(routes.reservation.getReservation)
  getCar(@Param() { id }: GetReservationRequest): Promise<Reservation> {
    return this.repository.findOneOrFail(id);
  }
}
