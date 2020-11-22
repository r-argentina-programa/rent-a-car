const { fromModelToEntity } = require('../mapper/carMapper');
const Car = require('../entity/Car');
const CarNotDefinedError = require('../error/CarNotDefinedError');
const CarIdNotDefinedError = require('../error/CarIdNotDefinedError');
const CarNotFoundError = require('../error/CarNotFoundError');
const ReservationModel = require('../../reservation/model/reservationModel');

module.exports = class CarRepository {
  /**
   * @param {typeof import('../model/carModel')} carModel
   */
  constructor(carModel) {
    this.carModel = carModel;
  }

  /**
   * @param {import('../entity/Car')} car
   */
  async save(car) {
    if (!(car instanceof Car)) {
      throw new CarNotDefinedError();
    }

    const carInstance = this.carModel.build(car, {
      isNewRecord: !car.id,
    });
    await carInstance.save();
    return fromModelToEntity(carInstance);
  }

  async getAll() {
    const carInstances = await this.carModel.findAll();
    return carInstances.map((carInstance) => fromModelToEntity(carInstance));
  }

  async getCarsLength() {
    return this.carModel.count();
  }

  async getLastCar() {
    const carInstance = await this.carModel.findOne({
      order: [['id', 'DESC']],
    });
    return fromModelToEntity(carInstance);
  }

  /**
   * @param {number} carId
   * @returns {Promise<import('../entity/Car')>}
   */
  async getById(carId) {
    if (!Number(carId)) {
      throw new CarIdNotDefinedError();
    }

    const carInstance = await this.carModel.findByPk(carId, { include: ReservationModel });
    if (!carInstance) {
      throw new CarNotFoundError(`No existe el auto con ID ${carId} (quizás haya sido eliminado)`);
    }

    return fromModelToEntity(carInstance);
  }

  /**
   * @param {import('../entity/Car')} car
   * @returns {Promise<Boolean>} Returns true if a car was deleted, otherwise it returns false
   */
  async delete(car) {
    if (!(car instanceof Car)) {
      throw new CarNotDefinedError();
    }

    return Boolean(await this.carModel.destroy({ where: { id: car.id } }));
  }
};
