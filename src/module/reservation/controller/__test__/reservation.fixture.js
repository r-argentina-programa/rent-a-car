const Reservation = require('../../entity/Reservation');
const { ReservationStatus } = require('../../entity/ReservationStatus');

module.exports = function createTestReservation(id) {
  return new Reservation(
    id,
    '2020-10-05T15:00',
    '2020-10-08T15:00',
    1000,
    3000,
    'Cash',
    new ReservationStatus('Paga', 1),
    1,
    1
  );
};
