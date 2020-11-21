const { statuses } = require('./ReservationStatus');

module.exports = class Reservation {
  /**
   * @param {number} id
   * @param {string} startDate
   * @param {string} finishDate
   * @param {number} pricePerDay
   * @param {number} totalPrice
   * @param {string} paymentMethod
   * @param {import('./ReservationStatus').ReservationStatus} status
   * @param {number} carId
   * @param {number} userId
   * @param {string} createdAt
   * @param {string} updatedAt
   * @param {import('../../car/entity/Car')} car
   * @param {import('../../user/entity/User')} user
   */
  constructor(
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
    car,
    user
  ) {
    this.id = id;
    this.startDate = new Date(startDate);
    this.finishDate = new Date(finishDate);
    this.formattedDates = this.formatDate();
    this.pricePerDay = pricePerDay;
    this.totalPrice = totalPrice;
    this.paymentMethod = paymentMethod;
    this.status = status;
    this.carId = carId;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.car = car;
    this.user = user;
  }

  formatDate() {
    const [startDate, finishDate] = [this.startDate, this.finishDate].map((date) =>
      new Date(date).toLocaleString(false, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })
    );
    return { startDate, finishDate };
  }

  calculateReservationLength() {
    const MILISECONDS_IN_A_DAY = 86400000;
    const finishDate = new Date(this.finishDate).getTime();
    const startDate = new Date(this.startDate).getTime();
    return Math.ceil((finishDate - startDate) / MILISECONDS_IN_A_DAY);
  }

  /**
   * @param {import('../../car/entity/Car')} car
   */
  reserve(car) {
    this.pricePerDay = this.pricePerDay || car.price;
    this.totalPrice = this.pricePerDay * this.calculateReservationLength();
    return this;
  }

  pay() {
    this.status = statuses.PAID;
    return this;
  }

  finish() {
    if (this.paid !== true) {
      throw new Error("La reserva no puede finalizarse porque no está paga.")
    }

    this.status = statuses.FINISHED;
    return this;
  }

  unblock() {
    this.status = statuses.PENDING;
  }

  get paid(){
    return this.status.value === statuses.PAID.value;
  }
};
