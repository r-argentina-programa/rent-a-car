module.exports = class Reservation {
  STATUS = {
    PENDING: 0,
    CONFIRMED: 1,
    FINISHED: 2,
  };

  /**
   * @param {number} id
   * @param {string} startDate
   * @param {string} finishDate
   * @param {number} pricePerDay
   * @param {number} totalPrice
   * @param {string} paymentMethod
   * @param {boolean} paid
   * @param {string} status
   * @param {number} carId
   * @param {number} userId
   * @param {string} createdAt
   * @param {string} updatedAt
   */
  constructor(
    id,
    startDate,
    finishDate,
    pricePerDay,
    totalPrice,
    paymentMethod,
    paid,
    status,
    carId,
    userId,
    createdAt,
    updatedAt
  ) {
    this.id = id;
    this.startDate = startDate;
    this.finishDate = finishDate;
    this.formattedDates = this.formatDate();
    this.pricePerDay = pricePerDay;
    this.totalPrice = totalPrice;
    this.paymentMethod = paymentMethod;
    this.paid = paid;
    this.status = status;
    this.carId = carId;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
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
    this.status = this.paid ? this.STATUS.CONFIRMED : this.STATUS.PENDING;
    return this;
  }

  pay() {
    this.paid = true;
    this.status = this.STATUS.CONFIRMED;
    return this;
  }

  finish() {
    if (this.paid !== true) {
      throw new Error("La reserva no puede finalizarse porque no está paga.")
    }

    this.status = this.STATUS.FINISHED;
    return this;
  }

  unblock() {
    this.status = this.STATUS.PENDING;
  }
};
