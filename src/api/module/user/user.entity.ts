import { Expose } from 'class-transformer';
import { Reservation } from '../reservation/reservation.entity';
import { BaseEntity } from '../../common/base.entity';

export class User extends BaseEntity {
  public firstName: string;

  public lastName: string;

  public idType: string;

  public idNumber: string;

  public nationality: string;

  public address: string;

  public phoneNumber: string;

  public email: string;

  public birthdate: Date;

  public reservations: Reservation[];

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
