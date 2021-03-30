import { BaseEntity } from '../../../common/domain/base.entity';
import { Reservation } from '../../reservation/domain/reservation.entity';
import { TransmissionType } from './car.transmission-type';

export class Car extends BaseEntity {
  public ac: boolean;

  public brand: string;

  public color: string;

  public img: string;

  public kms: number;

  public model: string;

  public passengers: number;

  public price: number;

  public transmission: TransmissionType;

  public year: number;

  public reservations: Reservation[];

  public deletedAt: Date;

  get name(): string {
    return `${this.brand} ${this.model}`;
  }
}
