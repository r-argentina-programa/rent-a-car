'use strict';

const UserModel = require('../../src/module/user/model/userModel');
const CarModel = require('../../src/module/car/model/carModel');
const ReservationModel = require('../../src/module/reservation/model/reservationModel');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    UserModel.setup(queryInterface.sequelize).sync({ force: true });
    CarModel.setup(queryInterface.sequelize).sync({ force: true });
    ReservationModel.setup(queryInterface.sequelize).setupAssociations(CarModel, UserModel).sync({ force: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('cars');
    await queryInterface.dropTable('reservations');
  }
};
