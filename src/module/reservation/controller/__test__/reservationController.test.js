const ReservationController = require('../reservationController');
const createTestReservation = require('./reservation.fixture');
const createTestCar = require('../../../car/controller/__test__/cars.fixture');
const createTestUser = require('../../../user/controller/__test__/user.fixture');
const { statuses: reservationStatuses } = require('../../entity/ReservationStatus')
const ReservationIdNotDefinedError = require('../../error/ReservationIdNotDefinedError');

let reservationServiceMock;
let carServiceMock;
let userServiceMock;
let reqMock;
let resMock;
let reservationController;

beforeEach(() => {
  reservationServiceMock = {
    makeReservation: jest.fn(),
    finish: jest.fn(),
    unblock: jest.fn(),
    pay: jest.fn(),
    getAll: jest.fn(() => Array.from({ length: 3 }, (id) => createTestReservation(id + 1))),
    getById: jest.fn(id => createTestReservation(id))
  };

  carServiceMock = {
    getAll: jest.fn(() => [createTestCar(1)]),
    getById: jest.fn(() => undefined),
  };

  userServiceMock = {
    getAll: jest.fn(() => [createTestUser(1)]),
    getById: jest.fn()
  };

  reqMock = {
    params: { reservationId: 1 },
  };

  resMock = {
    render: jest.fn(),
    redirect: jest.fn(),
  };

  reservationController = new ReservationController(
    reservationServiceMock,
    carServiceMock,
    userServiceMock
  );
});

describe('ReservationController methods', () => {
  afterEach(() => {
    Object.values(reservationServiceMock).forEach((mockFn) => mockFn.mockClear());
    Object.values(resMock).forEach((mockFn) => mockFn.mockClear());
  });

  test('configures routes for every method', () => {
    const app = {
      get: jest.fn(),
      post: jest.fn(),
    };
    reservationController.configureRoutes(app);

    expect(app.get).toHaveBeenCalled();
    expect(app.post).toHaveBeenCalled();
  });

  test('manage renders manage.njk with a list of reservations', async () => {
    const reservations = reservationServiceMock.getAll();
    await reservationController.manage(reqMock, resMock);

    expect(reservationServiceMock.getAll).toHaveBeenCalledTimes(2);
    expect(resMock.render).toHaveBeenCalledTimes(1);

    expect(resMock.render).toHaveBeenCalledWith('reservation/views/manage.njk', {
      title: 'Reservation List',
      reservations,
      reservationStatuses
    });
  });

  test('view renders view.njk with a single reservation', async () => {
    const reservation = reservationServiceMock.getById(1);
    await reservationController.view(reqMock, resMock);

    expect(reservationServiceMock.getById).toHaveBeenCalledTimes(2);
    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith('reservation/views/view.njk', {
      title: 'Viewing Reservation #1',
      reservation
    });
  });

  test('view throws an error on undefined reservationId as argument', async () => {
    const reqMockWithoutReservationId = {
      params: {},
    };

    await expect(() =>
      reservationController.view(reqMockWithoutReservationId, resMock)
    ).rejects.toThrowError(ReservationIdNotDefinedError);
  });

  test('edit renders a form to edit a reservation', async () => {
    const reservation = reservationServiceMock.getById(1);
    const cars = carServiceMock.getAll();
    const users = userServiceMock.getAll();
    await reservationController.edit(reqMock, resMock);

    expect(reservationServiceMock.getById).toHaveBeenCalledTimes(2);
    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith('reservation/views/edit.njk', {
      title: 'Editing Reservation #1',
      reservation,
      users,
      cars
    });
  });

  test('edit throws an error on undefined reservationId as argument', async () => {
    const reqMockWithoutReservationId = {
      params: {},
    };

    await expect(() =>
      reservationController.edit(reqMockWithoutReservationId, resMock)
    ).rejects.toThrowError(ReservationIdNotDefinedError);
  });


  test('add renders a form to add a new reservation', async () => {
    const cars = carServiceMock.getAll();
    const users = userServiceMock.getAll();
    const nextMock = jest.fn();

    await reservationController.add(reqMock, resMock, nextMock)

    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith('reservation/views/add.njk', {
      title: 'Add New Reservation',
      cars,
      users,
    });
  });

  test('add bubbles up the error when there are no cars or no users available', async () => {
    const nextMock = jest.fn();
    reservationController = new ReservationController(
      reservationServiceMock,
      { getAll: jest.fn(() => []) },
      { getAll: jest.fn(() => []) },
    );

    await reservationController.add(reqMock, resMock, nextMock)
    expect(resMock.render).toHaveBeenCalledTimes(0);
  });

  test('saves a reservation', async () => {
    const reqSaveMock = {
      body: {
        id: 1,
        'start-date': '2020-10-05T15:00',
        'finish-date': '2020-10-08T15:00',
        'price-per-day': 1000,
        'total-price': 3000,
        'payment-method': 'Cash',
        paid: true,
        status: 'Confirmed',
        'car-id': '1',
        'user-id': '1',
      },
    };

    await reservationController.save(reqSaveMock, resMock);
    expect(reservationServiceMock.makeReservation).toHaveBeenCalledTimes(1);
    expect(reservationServiceMock.makeReservation).toHaveBeenCalledWith(createTestReservation(1), undefined);
    expect(resMock.redirect).toHaveBeenCalledTimes(1);
  });

  test('mark a reservation as finished', async () => {
    const reservation = createTestReservation(1);
    await reservationController.finish(reqMock, resMock);

    expect(reservationServiceMock.finish).toHaveBeenCalledTimes(1);
    expect(reservationServiceMock.finish).toHaveBeenCalledWith(reservation);
  });

  test('finish throws an error on undefined reservationId as argument', async () => {
    const reqMockWithoutReservationId = {
      params: {},
    };

    await expect(() =>
      reservationController.finish(reqMockWithoutReservationId, resMock)
    ).rejects.toThrowError(ReservationIdNotDefinedError);
  });

  test('unblock a finished reservation', async () => {
    const reservation = createTestReservation(1);
    await reservationController.unblock(reqMock, resMock);

    expect(reservationServiceMock.unblock).toHaveBeenCalledTimes(1);
    expect(reservationServiceMock.unblock).toHaveBeenCalledWith(reservation);
  });

  test('unblock throws an error on undefined reservationId as argument', async () => {
    const reqMockWithoutReservationId = {
      params: {},
    };

    await expect(() =>
      reservationController.unblock(reqMockWithoutReservationId, resMock)
    ).rejects.toThrowError(ReservationIdNotDefinedError);
  });

  test('pay a finished reservation', async () => {
    const reservation = createTestReservation(1);
    await reservationController.pay(reqMock, resMock);

    expect(reservationServiceMock.pay).toHaveBeenCalledTimes(1);
    expect(reservationServiceMock.pay).toHaveBeenCalledWith(reservation);
  });

  test('pay throws an error on undefined reservationId as argument', async () => {
    const reqMockWithoutReservationId = {
      params: {},
    };

    await expect(() =>
      reservationController.pay(reqMockWithoutReservationId, resMock)
    ).rejects.toThrowError(ReservationIdNotDefinedError);
  });
});
