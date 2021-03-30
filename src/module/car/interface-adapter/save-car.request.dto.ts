import { IsString } from 'class-validator';
import { TransmissionType } from '../domain/car.transmission-type';

export class SaveCarRequestDto {
  @IsString({ message: 'La marca no fue especificada' })
  public brand: string;

  @IsString()
  public model: string;

  public year: number;

  public color: string;

  public kms: number;

  public passengers: number;

  public transmission: TransmissionType;

  public price: number;

  public img: string;

  public ac: boolean;
}
