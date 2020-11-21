const { Sequelize } = require('sequelize');
const UserRepository = require('../userRepository');
const userModel = require('../../model/userModel');
const reservationModel = require('../../../reservation/model/reservationModel');
const createTestUser = require('../../controller/__test__/user.fixture');
const createTestReservation = require('../../../reservation/controller/__test__/reservation.fixture');
const UserNotDefinedError = require('../../error/UserNotDefinedError');
const UserIdNotDefinedError = require('../../error/UserIdNotDefinedError');
const UserNotFoundError = require('../../error/UserNotFoundError');
const { statuses } = require('../../../reservation/entity/ReservationStatus');

describe('UserRepository methods', () => {
  const sequelize = new Sequelize('sqlite::memory');
  const UserModel = userModel.setup(sequelize);
  const ReservationModel = reservationModel.setup(sequelize);
  UserModel.hasMany(ReservationModel, { foreignKey: 'userId' });
  ReservationModel.belongsTo(UserModel, { foreignKey: 'userId' });
  const userRepository = new UserRepository(UserModel);

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  test('saves a new user in DB', async () => {
    const userWithoutId = createTestUser();
    const { id, firstName, lastName } = await userRepository.save(userWithoutId);
    expect(id).toEqual(1);
    expect(firstName).toEqual('Juan');
    expect(lastName).toEqual('Lopez');
  });

  test('updates a user in DB', async () => {
    const userWithoutId = createTestUser();
    const userWithId = createTestUser(1);
    userWithId.firstName = 'Luis';
    userWithId.lastName = 'Gomez';

    const newUser = await userRepository.save(userWithoutId);
    const newUserTwo = await userRepository.save(userWithoutId);
    expect(newUser.id).toEqual(1);
    expect(newUserTwo.id).toEqual(2);

    const updatedUser = await userRepository.save(userWithId);
    expect(updatedUser.id).toEqual(1);
    expect(updatedUser.firstName).toEqual('Luis');
    expect(updatedUser.lastName).toEqual('Gomez');
  });

  test('save throws an error because of lack of User entity as argument', async () => {
    await expect(userRepository.save()).rejects.toThrowError(UserNotDefinedError);
  });

  test('getAll returns every stored user in DB', async () => {
    const userWithoutId = createTestUser();
    await userRepository.save(userWithoutId);
    await userRepository.save(userWithoutId);
    const users = await userRepository.getAll();

    expect(users).toHaveLength(2);
    expect(users[0].id).toEqual(1);
    expect(users[1].id).toEqual(2);
  });

  test('getById returns a single user and its reservations from DB', async () => {
    const userWithoutId = createTestUser();
    const reservationWithoutId = createTestReservation();
    reservationWithoutId.status = statuses.PENDING.value;
    await userRepository.save(userWithoutId);
    await userRepository.save(userWithoutId);

    const userInstance = await userRepository.userModel.findByPk(2);
    await userInstance.createReservation(reservationWithoutId);
    await userInstance.createReservation(reservationWithoutId);

    const user = await userRepository.getById(2);
    expect(user.id).toEqual(2);
    expect(user.reservations).toHaveLength(2);
  });

  test('getById throws an error on undefined userId as argument', async () => {
    await expect(userRepository.getById()).rejects.toThrowError(UserIdNotDefinedError);
  });

  test('getById throws an error because there is no user stored in DB with this ID', async () => {
    const userId = 2;

    await expect(userRepository.getById(userId)).rejects.toThrowError(UserNotFoundError);
    await expect(userRepository.getById(userId)).rejects.toThrowError(
      `There is no existing user with ID ${userId}`
    );
  });
});
