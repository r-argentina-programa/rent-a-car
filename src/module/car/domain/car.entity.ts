import { BaseEntity } from '../../../common/domain/base.entity';
import { Reservation } from '../../reservation/domain/reservation.entity';

export class Car extends BaseEntity {
  public ac: boolean;

  public brand: string;

  public color: string;

  public img: string;

  public kms: number;

  public model: string;

  public passengers: number;

  public price: number;

  public transmission: string;

  public year: number;

  public reservations: Reservation[];

  get name(): string {
    return `${this.brand} ${this.model}`;
  }
}
