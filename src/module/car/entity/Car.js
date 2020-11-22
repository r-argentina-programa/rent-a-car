module.exports = class Car {
  /**
   * @param {number} id
   * @param {string} brand
   * @param {string} model
   * @param {number} year
   * @param {number} kms
   * @param {string} color
   * @param {string} ac
   * @param {number} passengers
   * @param {string} transmission
   * @param {number} price
   * @param {string} img
   * @param {string} createdAt
   * @param {string} updatedAt
   * @param {string} deletedAt
   * @param {import('../../reservation/entity/Reservation')[]} reservations
   */
  constructor(
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
    createdAt,
    updatedAt,
    deletedAt,
    reservations
  ) {
    this.id = id;
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.kms = kms;
    this.color = color;
    this.ac = ac;
    this.passengers = passengers;
    this.transmission = transmission;
    this.price = price;
    this.img = img;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.reservations = reservations;
  }

  get name(){
    return `${this.brand} ${this.model}`;
  }
};
