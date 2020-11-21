const Reservation = require('../entity/Reservation');
const { ReservationStatus, statuses } = require('../entity/ReservationStatus');

/**
 * 
 * @param {Number} statusId 
 * @returns {ReservationStatus}
 */
function getReservationStatusById(statusId) {
  /**
   * @type {ReservationStatus[]}
   */
  const statusesList = Object.values(statuses);
  return statusesList.find(status => status.value == statusId);
}

exports.fromModelToEntity = ({
  id,
  startDate,
  finishDate,
  pricePerDay,
  totalPrice,
  paymentMethod,
  status,
  carId,
  userId,
  createdAt,
  updatedAt,
  Car,
  User
}, fromCarModelToEntityMapper, fromUserModelToEntityMapper) =>
  new Reservation(
    id,
    startDate,
    finishDate,
    pricePerDay,
    totalPrice,
    paymentMethod,
    getReservationStatusById(status),
    carId,
    userId,
    createdAt,
    updatedAt,
    Car ? fromCarModelToEntityMapper(Car) : {},
    User ? fromUserModelToEntityMapper(User) : {}
  );

exports.fromFormToEntity = ({
  id,
  'start-date': startDate,
  'finish-date': finishDate,
  'price-per-day': pricePerDay,
  'total-price': totalPrice,
  'payment-method': paymentMethod,
  status,
  'car-id': carId,
  'user-id': userId,
  'created-at': createdAt,
}) =>
  new Reservation(
    id,
    startDate,
    finishDate,
    pricePerDay,
    totalPrice,
    paymentMethod,
    status,
    Number(carId),
    Number(userId),
    createdAt
  );
