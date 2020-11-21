const ReservationNotDefinedError = require('../error/ReservationNotDefinedError');
const ReservationIdNotDefinedError = require('../error/ReservationIdNotDefinedError');
const CarNotDefinedError = require('../../car/error/CarNotDefinedError');
const Reservation = require('../entity/Reservation');
const Car = require('../../car/entity/Car');

module.exports = class ReservationService {
  /**
   * @param {import('../repository/reservationRepository')} reservationRepository
   */
  constructor(reservationRepository) {
    this.reservationRepository = reservationRepository;
  }

  /**
   * @param {Reservation} reservation
   * @param {Car} car
   */
  async makeReservation(reservation, car) {
    if (!(reservation instanceof Reservation)) {
      throw new ReservationNotDefinedError();
    }
    if (!(car instanceof Car)) {
      throw new CarNotDefinedError();
    }

    reservation.reserve(car);
    return this.reservationRepository.save(reservation);
  }

  /**
   * @param {import('../entity/Reservation')} reservation
   */
  async finish(reservation) {
    if (!(reservation instanceof Reservation)) {
      throw new ReservationNotDefinedError();
    }

    reservation.finish();
    return this.reservationRepository.save(reservation);
  }

  /**
   * @param {import('../entity/Reservation')} reservation
   */
  async unblock(reservation) {
    if (!(reservation instanceof Reservation)) {
      throw new ReservationNotDefinedError();
    }

    reservation.unblock();
    return this.reservationRepository.save(reservation);
  }

  /**
   * @param {import('../entity/Reservation')} reservation
   */
  async pay(reservation) {
    if (!(reservation instanceof Reservation)) {
      throw new ReservationNotDefinedError();
    }

    reservation.pay();
    return this.reservationRepository.save(reservation);
  }

  async getAll() {
    return this.reservationRepository.getAll();
  }

  /**
   * 
   * @param  {...import('../entity/ReservationStatus').ReservationStatus} statuses 
   */
  async getByStatus(...statuses){
    return this.reservationRepository.getByStatus(statuses.map(r => r.value));
  }

  /**
   * @param {Number} reservationId
   */
  async getById(reservationId) {
    if (!Number(reservationId)) {
      throw new ReservationIdNotDefinedError();
    }

    return this.reservationRepository.getById(reservationId);
  }
};
