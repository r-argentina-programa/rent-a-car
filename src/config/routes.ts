const defaultRoot = '/';
const carRoot = '/car';
const reservationRoot = '/reservation';
const userRoot = '/user';

export default {
  default: {
    root: defaultRoot,
  },
  car: {
    root: carRoot,
    getCar: ':id',
    getCars: `${carRoot}`,
  },
  reservation: {
    root: reservationRoot,
    getReservation: '/:id',
    getReservations: '/',
    reserveCar: '/',
    getStatuses: '/statuses',
  },
  user: {
    root: userRoot,
    getCar: ':id',
    getCars: `${carRoot}`,
  },
};
