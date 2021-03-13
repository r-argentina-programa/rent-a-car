import { ReservationStatus } from './reservation.status';

export interface IReservationStatuses {
  PENDING: ReservationStatus;
  PAID: ReservationStatus;
  FINISHED: ReservationStatus;
}
