const { Op } = require('sequelize');
const { fromModelToEntity } = require('../mapper/reservationMapper');
const { fromModelToEntity: fromCarModelToEntity } = require('../../car/mapper/carMapper');
const { fromModelToEntity: fromUserModelToEntity } = require('../../user/mapper/userMapper');
const ReservationNotDefinedError = require('../error/ReservationNotDefinedError');
const ReservationIdNotDefinedError = require('../error/ReservationIdNotDefinedError');
const ReservationNotFoundError = require('../error/ReservationNotFoundError');
const Reservation = require('../entity/Reservation');
const CarModel = require('../../car/model/carModel');
const UserModel = require('../../user/model/userModel');

module.exports = class ReservationRepository {
  /**
   * @param {typeof import('../model/reservationModel')} reservationModel
   */
  constructor(reservationModel) {
    this.reservationModel = reservationModel;
  }

  /**
   * @param {import('../entity/Reservation')} reservation
   */
  async save(reservation) {
    if (!(reservation instanceof Reservation)) {
      throw new ReservationNotDefinedError();
    }
    const reservationData = Object.assign({}, reservation);
    reservationData.status = reservation.status.value;

    const reservationInstance = this.reservationModel.build(reservationData, {
      isNewRecord: !reservationData.id,
    });
    await reservationInstance.save();
    return fromModelToEntity(reservationInstance, fromCarModelToEntity, fromUserModelToEntity);
  }

  async getAll() {
    const reservationInstances = await this.reservationModel.findAll({
      include: [
        {model: CarModel, paranoid: false},
        {model: UserModel, paranoid: false},
      ],
    });
    return reservationInstances.map(r => fromModelToEntity(r, fromCarModelToEntity, fromUserModelToEntity));
  }

  /**
   * @param {number} reservationId
   */
  async getById(reservationId) {
    if (!Number(reservationId)) {
      throw new ReservationIdNotDefinedError();
    }
    const reservationInstance = await this.reservationModel.findByPk(reservationId, {
      include: [
        {model: CarModel, paranoid: false},
        {model: UserModel, paranoid: false},
      ],
    });
    if (!reservationInstance) {
      throw new ReservationNotFoundError(
        `There is no existing reservation with ID ${reservationId}`
      );
    }

    return fromModelToEntity(reservationInstance, fromCarModelToEntity, fromUserModelToEntity);
  }

  async getByStatus(...statuses) {
    const reservationInstances = await this.reservationModel.findAll({
      include: [
        {model: CarModel, paranoid: false},
        {model: UserModel, paranoid: false},
      ],
      where: {
        status: {
          [Op.or]: statuses
        }
      }
    });

    return reservationInstances.map((reservationInstance) => fromModelToEntity(reservationInstance, fromCarModelToEntity, fromUserModelToEntity));
  }
};
