const { Sequelize } = require('sequelize');
const CarRepository = require('../carRepository');
const carModel = require('../../model/carModel');
const reservationModel = require('../../../reservation/model/reservationModel');
const createTestCar = require('../../controller/__test__/cars.fixture');
const createTestReservation = require('../../../reservation/controller/__test__/reservation.fixture');
const CarNotDefinedError = require('../../error/CarNotDefinedError');
const CarIdNotDefinedError = require('../../error/CarIdNotDefinedError');
const CarNotFoundError = require('../../error/CarNotFoundError');
const { statuses } = require('../../../reservation/entity/ReservationStatus');

describe('CarRepository methods', () => {
  let sequelize, CarModel, ReservationModel, carRepository;
  beforeEach(async (done) => {
    sequelize = new Sequelize('sqlite::memory');
    CarModel = carModel.setup(sequelize);
    ReservationModel = reservationModel.setup(sequelize);
    CarModel.hasMany(ReservationModel, { foreignKey: 'carId' });
    ReservationModel.belongsTo(CarModel, { foreignKey: 'carId' });
    carRepository = new CarRepository(CarModel);
    await sequelize.sync({ force: true });
    done();
  });

  test('saves a new car in DB', async () => {
    const carWithoutId = createTestCar();
    const { id, brand, model } = await carRepository.save(carWithoutId);
    expect(id).toEqual(1);
    expect(brand).toEqual('Ford');
    expect(model).toEqual('Fiesta');
  });

  test('updates a car in DB', async () => {
    const carWithoutId = createTestCar();
    const carWithId = createTestCar(1);
    carWithId.brand = 'Chevrolet';
    carWithId.model = 'Onix';

    const newCar = await carRepository.save(carWithoutId);
    const newCarTwo = await carRepository.save(carWithoutId);
    expect(newCar.id).toEqual(1);
    expect(newCarTwo.id).toEqual(2);

    const updatedCar = await carRepository.save(carWithId);
    expect(updatedCar.id).toEqual(1);
    expect(updatedCar.brand).toEqual('Chevrolet');
    expect(updatedCar.model).toEqual('Onix');
  });

  test('save throws an error because of lack of Car entity as argument', async () => {
    const car = {
      id: 1,
      brand: 'Ford',
      model: 'Fiesta',
    };
    await expect(carRepository.save(car)).rejects.toThrowError(CarNotDefinedError);
  });

  test('getAll returns every car stored in DB', async () => {
    const carWithoutId = createTestCar(undefined, false);
    await carRepository.save(carWithoutId);
    await carRepository.save(carWithoutId);
    const cars = await carRepository.getAll();

    expect(cars).toHaveLength(2);
    expect(cars[0].id).toEqual(1);
    expect(cars[1].id).toEqual(2);
  });

  test('getCarsLength returns number of cars stored in DB', async () => {
    const carWithoutId = createTestCar(undefined, false);
    await carRepository.save(carWithoutId);
    await carRepository.save(carWithoutId);
    await carRepository.save(carWithoutId);
    const carsLength = await carRepository.getCarsLength();

    expect(carsLength).toEqual(3);
  });

  test('getLastCar returns last car stored in DB', async () => {
    const carWithoutId = createTestCar(undefined, false);
    await carRepository.save(carWithoutId);
    await carRepository.save(carWithoutId);
    const carThree = await carRepository.save(carWithoutId);
    const lastCar = await carRepository.getLastCar();

    expect(lastCar).toEqual(carThree);
  });

  test('getById returns single car and its reservations from DB', async () => {
    const carWithoutId = createTestCar();
    const reservationWithoutId = createTestReservation();
    reservationWithoutId.status = statuses.PENDING.value;
    await carRepository.save(carWithoutId);

    const carInstance = await carRepository.carModel.findByPk(1);
    await carInstance.createReservation(reservationWithoutId);
    await carInstance.createReservation(reservationWithoutId);

    const car = await carRepository.getById(1);
    expect(car.id).toEqual(1);
    expect(car.reservations).toHaveLength(2);
  });

  test('getById throws an error on undefined carId as argument', async () => {
    await expect(carRepository.getById()).rejects.toThrowError(CarIdNotDefinedError);
  });

  test('getById throws an error because there is no car stored in DB with this ID', async () => {
    const carId = 2;

    await expect(carRepository.getById(carId)).rejects.toThrowError(CarNotFoundError);
    await expect(carRepository.getById(carId)).rejects.toThrowError(
      `No existe el auto con ID ${carId} (quizás haya sido eliminado)`
    );
  });

  test('deletes an existing car in DB and returns true', async () => {
    const carWithoutId = createTestCar();
    await carRepository.save(carWithoutId);
    await carRepository.save(carWithoutId);
    await carRepository.save(carWithoutId);

    const car = await carRepository.getById(2);
    const deletedCar = await carRepository.delete(car);
    const remainingCars = await carRepository.getAll();

    expect(deletedCar).toEqual(true);
    expect(remainingCars[0].id).toEqual(1);
    expect(remainingCars[1].id).toEqual(3);
  });

  test('tries to delete non-existent car in DB and returns false', async () => {
    const carWithoutId = createTestCar();
    await carRepository.save(carWithoutId);
    await carRepository.save(carWithoutId);

    const carNumberThree = createTestCar(3);
    const deletedCar = await carRepository.delete(carNumberThree);

    expect(deletedCar).toEqual(false);
  });

  test('delete throws an error because of lack of Car entity as argument', async () => {
    const car = {
      id: 1,
      brand: 'Ford',
      model: 'Fiesta',
    };
    await expect(carRepository.delete(car)).rejects.toThrowError(CarNotDefinedError);
  });
});
