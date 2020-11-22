const { fromModelToEntity: reservationModelToEntityMapper } = require('../../reservation/mapper/reservationMapper');
const Car = require('../entity/Car');

exports.fromModelToEntity = ({
  id,
  brand,
  model,
  year,
  kms,
  color,
  ac,
  passengers,
  transmission,
  price,
  img,
  createdAt = null,
  updatedAt = null,
  deletedAt = null,
  Reservations = []
}) =>
  new Car(
    Number(id),
    brand,
    model,
    Number(year),
    Number(kms),
    color,
    ac,
    Number(passengers),
    transmission,
    Number(price),
    img,
    createdAt,
    updatedAt,
    deletedAt,
    Reservations.map(reservationModelToEntityMapper)
  );

exports.fromFormToEntity = ({
  id,
  brand,
  model,
  year,
  kms,
  color,
  ac,
  passengers,
  transmission,
  price,
  img,
  'created-at': createdAt,
}) =>
  new Car(id, brand, model, year, kms, color, ac, passengers, transmission, price, img, createdAt);
