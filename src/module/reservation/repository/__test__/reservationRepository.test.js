const { Sequelize } = require('sequelize');
const ReservationRepository = require('../reservationRepository');
const reservationModel = require('../../model/reservationModel');
const carModel = require('../../../car/model/carModel');
const userModel = require('../../../user/model/userModel');
const createTestReservation = require('../../controller/__test__/reservation.fixture');
const createTestCar = require('../../../car/controller/__test__/cars.fixture');
const createTestUser = require('../../../user/controller/__test__/user.fixture');
const ReservationNotDefinedError = require('../../error/ReservationNotDefinedError');
const ReservationIdNotDefinedError = require('../../error/ReservationIdNotDefinedError');
const ReservationNotFoundError = require('../../error/ReservationNotFoundError');
const { statuses } = require('../../entity/ReservationStatus');

describe('ReservationRepository methods', () => {

  let sequelize, ReservationModel, reservationRepository;
  beforeEach(async () => {
    sequelize = new Sequelize('sqlite::memory');
    ReservationModel = reservationModel.setup(sequelize);
    carModel.setup(sequelize);
    userModel.setup(sequelize);
    ReservationModel.setupAssociations(carModel, userModel);
    reservationRepository = new ReservationRepository(ReservationModel);
    
    await sequelize.sync({ force: true });
  });

  test('saves a new reservation in DB', async () => {
    const reservationWithoutId = createTestReservation();
    const { id, status, totalPrice } = await reservationRepository.save(reservationWithoutId);
    expect(id).toEqual(1);
    expect(status).toEqual(statuses.PAID);
    expect(totalPrice).toEqual(3000);
  });

  test('updates a reservation in DB', async () => {
    const reservationWithoutId = createTestReservation();
    reservationWithoutId.status = statuses.PENDING;
    const reservationWithId = createTestReservation(1);
    reservationWithId.status = statuses.PAID;
    reservationWithId.totalPrice = 5000;

    const newReservation = await reservationRepository.save(reservationWithoutId);
    const newReservationTwo = await reservationRepository.save(reservationWithoutId);
    expect(newReservation.id).toEqual(1);
    expect(newReservationTwo.id).toEqual(2);

    const updatedReservation = await reservationRepository.save(reservationWithId);
    expect(updatedReservation.id).toEqual(1);
    expect(updatedReservation.status).toEqual(statuses.PAID);
    expect(updatedReservation.totalPrice).toEqual(5000);
  });

  test('save throws an error because of lack of Reservation entity as argument', async () => {
    const reservation = { id: 1, status: 'Confirmed', totalPrice: 3000 };

    await expect(reservationRepository.save(reservation)).rejects.toThrowError(ReservationNotDefinedError);
  });

  test('getAll returns every stored reservation in DB', async () => {
    const reservationWithoutId = createTestReservation();
    await reservationRepository.save(reservationWithoutId);
    await reservationRepository.save(reservationWithoutId);
    const reservations = await reservationRepository.getAll();

    expect(reservations).toHaveLength(2);
    expect(reservations[0].id).toEqual(1);
    expect(reservations[1].id).toEqual(2);
  });

  test('getById returns a single reservation with its associated car and user from DB', async () => {
    const reservationWithoutId = createTestReservation();
    const carWithId = createTestCar(1);
    const userWithId = createTestUser(1);
    await carModel.create(carWithId);
    await userModel.create(userWithId);
    await reservationRepository.save(reservationWithoutId);

    const reservation = await reservationRepository.getById(1);
    expect(reservation.id).toEqual(1);
    expect(reservation.car.id).toEqual(1);
    expect(reservation.user.id).toEqual(1);
  });

  test('getById returns a single reservation with its associated user and car as Null from DB', async () => {
    const reservationWithoutId = createTestReservation();
    const userWithId = createTestUser(1);
    await userModel.create(userWithId);
    await reservationRepository.save(reservationWithoutId);

    const reservation = await reservationRepository.getById(1);
    expect(reservation.id).toEqual(1);
    expect(reservation.car).toEqual({});
    expect(reservation.user.id).toEqual(1);
  });

  test('getById throws an error on undefined reservationId as argument', async () => {
    await expect(reservationRepository.getById()).rejects.toThrowError(ReservationIdNotDefinedError);
  });

  test('getById throws an error because there is no reservation stored in DB with this ID', async () => {
    const reservationId = 2;

    await expect(reservationRepository.getById(reservationId)).rejects.toThrowError(
      ReservationNotFoundError
    );
    await expect(reservationRepository.getById(reservationId)).rejects.toThrowError(
      `There is no existing reservation with ID ${reservationId}`
    );
  });
});
