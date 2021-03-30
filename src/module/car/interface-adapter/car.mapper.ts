import { SaveCarRequestDto } from './save-car.request.dto';
import { Car } from '../domain/car.entity';

export function mapRequestToEntity(request: SaveCarRequestDto): Car {
  const car = new Car();
  car.brand = request.brand;
  car.model = request.model;
  car.ac = request.ac;
  car.price = request.price;
  car.color = request.color;
  car.kms = request.kms;
  car.passengers = request.passengers;
  car.transmission = request.transmission;
  car.img = request.img;
  car.year = request.year;

  return car;
}
