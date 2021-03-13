import { Controller, Get, Inject } from '@nestjs/common';
import { BaseController } from '../../../../../common/application/base.controller';
import { Reservation } from '../../../domain/reservation.entity';
import { IReservationRepository } from '../../../application/reservation.repository.interface';
import routes from '../../../../../config/routes';

@Controller(routes.reservation.root)
export class GetReservationsHttpController extends BaseController {
  constructor(@Inject('IReservationRepository') private repository: IReservationRepository) {
    super();
  }

  @Get(routes.reservation.getReservations)
  getCars(): Promise<Reservation[]> {
    return this.repository.find();
  }
}
