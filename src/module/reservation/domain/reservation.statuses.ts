import { ReservationStatus } from './reservation.status';
import { IReservationStatuses } from './reservation.statuses.interface';

export const ReservationStatuses: IReservationStatuses = {
  PENDING: new ReservationStatus('Pendiente', 0),
  PAID: new ReservationStatus('Paga', 1),
  FINISHED: new ReservationStatus('Finalizada', 2),
};
