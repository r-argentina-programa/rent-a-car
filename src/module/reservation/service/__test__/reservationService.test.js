const ReservationService = require('../reservationService');
const createTestReservation = require('../../controller/__test__/reservation.fixture');
const createTestCar = require('../../../car/controller/__test__/cars.fixture');
const ReservationNotDefinedError = require('../../error/ReservationNotDefinedError');
const CarNotDefinedError = require('../../../car/error/CarNotDefinedError');
const ReservationIdNotDefinedError = require('../../error/ReservationIdNotDefinedError');
const { statuses } = require('../../entity/ReservationStatus');

describe('ReservationService methods', () => {

  let repositoryMock;

  /**
   * @type {import('../reservationService')}
   */
  let reservationService;
  beforeEach(() => {
    repositoryMock = {
      save: jest.fn(),
      getAll: jest.fn(),
      getById: jest.fn(),
    };

    reservationService = new ReservationService(repositoryMock);

  })
  afterEach(() => {
    Object.values(repositoryMock).forEach((mockFn) => mockFn.mockClear());
  });

  test("save calls repository's save method, price per day and total price is taken from the reservation", async () => {
    const reservation = createTestReservation(1);
    const car = createTestCar(1);
    await reservationService.makeReservation(reservation, car);

    expect(reservation.totalPrice).toEqual(3000);
    expect(reservation.status).toEqual(statuses.PAID);
    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
    expect(repositoryMock.save).toHaveBeenCalledWith(reservation);
  });

  test("save calls repository's save method, price per day and total price is taken from the car's price", async () => {
    const reservation = createTestReservation(1);
    reservation.pricePerDay = undefined;
    const car = createTestCar(1);
    car.price = 4000;
    await reservationService.makeReservation(reservation, car);

    expect(reservation.pricePerDay).toEqual(4000);
    expect(reservation.totalPrice).toEqual(12000);
    expect(reservation.status).toEqual(statuses.PAID);
    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
    expect(repositoryMock.save).toHaveBeenCalledWith(reservation);
  });

  test('save throws an error because of lack of Reservation entity as argument', async () => {
    const reservation = { id: 1, firstName: 'Juan', lastName: 'Lopez' };

    await expect(reservationService.makeReservation(reservation)).rejects.toThrowError(ReservationNotDefinedError);
  });

  test('save throws an error because of lack of Car entity as argument', async () => {
    const reservation = createTestReservation(1);
    const car = { id: 1, brand: 'Ford', model: 'Fiesta' };

    await expect(reservationService.makeReservation(reservation, car)).rejects.toThrowError(CarNotDefinedError);
  });

  test("finish calls repository's save method", async () => {
    const reservation = createTestReservation(1);
    await reservationService.finish(reservation);

    expect(reservation.status).toEqual(statuses.FINISHED);
    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
    expect(repositoryMock.save).toHaveBeenCalledWith(reservation);
  });

  test('finish throws an error because of lack of Reservation entity as argument', async () => {
    const reservation = { id: 1, firstName: 'Juan', lastName: 'Lopez' };

    await expect(reservationService.finish(reservation)).rejects.toThrowError(ReservationNotDefinedError);
  });

  test("unblock calls repository's save method, sets reservation to 'Confirmed' status", async () => {
    const reservation = createTestReservation(1);
    reservation.status = statuses.FINISHED;
    await reservationService.unblock(reservation);

    expect(reservation.status).toEqual(statuses.PENDING);
    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
    expect(repositoryMock.save).toHaveBeenCalledWith(reservation);
  });

  test('unblock throws an error because of lack of Reservation entity as argument', async () => {
    const reservation = { id: 1, firstName: 'Juan', lastName: 'Lopez' };

    await expect(reservationService.unblock(reservation)).rejects.toThrowError(ReservationNotDefinedError);
  });

  test("pay calls repository's save method, sets reservation to 'Confirmed' status", async () => {
    const reservation = createTestReservation(1);
    reservation.status = statuses.PENDING;
    await reservationService.pay(reservation);

    expect(reservation.paid).toEqual(true);
    expect(reservation.status).toEqual(statuses.PAID);
    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
    expect(repositoryMock.save).toHaveBeenCalledWith(reservation);
  });

  test('pay throws an error because of lack of Reservation entity as argument', async () => {
    const reservation = { id: 1, firstName: 'Juan', lastName: 'Lopez' };

    await expect(reservationService.pay(reservation)).rejects.toThrowError(ReservationNotDefinedError);
  });

  test("getAll calls repository's getAll method", async () => {
    await reservationService.getAll();

    expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
  });

  test("getById calls repository's getById method", async () => {
    await reservationService.getById(1);

    expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
    expect(repositoryMock.getById).toHaveBeenCalledWith(1);
  });

  test('getById throws an error on undefined reservationId as argument', async () => {
    await expect(reservationService.getById()).rejects.toThrowError(ReservationIdNotDefinedError);
  });
});
