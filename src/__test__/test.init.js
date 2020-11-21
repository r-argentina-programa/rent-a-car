require('dotenv').config({
    path: '.env.test'
});
const initDIC = require('../config/di');
const UserModel = require('../../src/module/user/model/userModel');
const CarModel = require('../../src/module/car/model/carModel');
const ReservationModel = require('../../src/module/reservation/model/reservationModel');

const { initCarModule } = require('../module/car/module');
const { initUserModule } = require('../module/user/module');
const { initReservationModule } = require('../module/reservation/module');

module.exports = async function bootstrapTests() {
    const app = jest.fn();
    app.get = jest.fn();
    app.post = jest.fn();

    const container = initDIC();

    const sequelize = container.get('Sequelize');
    await UserModel.setup(sequelize).sync({ force: true });
    await CarModel.setup(sequelize).sync({ force: true });
    await ReservationModel.setup(sequelize).setupAssociations(CarModel, UserModel).sync({ force: true });

    initCarModule(app, container);
    initUserModule(app, container);
    initReservationModule(app, container);
    return container;
}
