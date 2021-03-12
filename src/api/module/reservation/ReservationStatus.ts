export class ReservationStatus {
  public name: string;

  public value: number;

  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}

export interface IReservationStatuses {
  PENDING: ReservationStatus;
  PAID: ReservationStatus;
  FINISHED: ReservationStatus;
}

export const ReservationStatuses: IReservationStatuses = {
  PENDING: new ReservationStatus('Pendiente', 0),
  PAID: new ReservationStatus('Paga', 1),
  FINISHED: new ReservationStatus('Finalizada', 2),
};
