import { IsNumber } from 'class-validator';

export class GetReservationRequest {
  @IsNumber()
  id!: number;
}
