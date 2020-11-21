const { fromModelToEntity: fromReservationModelToEntity } = require('../../reservation/mapper/reservationMapper');
const User = require('../entity/User');

exports.fromModelToEntity = ({
  id,
  firstName,
  lastName,
  idType,
  idNumber,
  nationality,
  address,
  phoneNumber,
  email,
  birthdate,
  createdAt,
  updatedAt,
  Reservations = []
}) =>
  new User(
    Number(id),
    firstName,
    lastName,
    idType,
    Number(idNumber),
    nationality,
    address,
    phoneNumber,
    email,
    birthdate,
    createdAt,
    updatedAt,
    Reservations.map(fromReservationModelToEntity)
  );

exports.fromFormToEntity = ({
  id,
  'first-name': firstName,
  'last-name': lastName,
  'id-type': idType,
  'id-number': idNumber,
  nationality,
  address,
  'phone-number': phoneNumber,
  email,
  birthdate,
  'created-at': createdAt,
}) =>
  new User(
    id,
    firstName,
    lastName,
    idType,
    idNumber,
    nationality,
    address,
    phoneNumber,
    email,
    birthdate,
    createdAt
  );
