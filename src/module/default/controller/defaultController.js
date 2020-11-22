const reservationStatuses = require('../../reservation/entity/ReservationStatus').statuses;
module.exports = class DefaultController {

  /**
   * 
   * @param {import('../../reservation/service/reservationService')} reservationService
   */
  constructor(reservationService) {
    this.ROUTE_BASE = '/';
    this.VIEWS_DIR = 'default/views';
    this.RESERVATION_VIEWS_DIR = 'reservation/views';
    this.reservationService = reservationService;
  }

  /**
   * @param {import('express').Application} app
   */
  configureRoutes(app) {
    const ROUTE = this.ROUTE_BASE;
    app.get(`${ROUTE}`, this.index.bind(this));
    app.get(`${ROUTE}js/reservation-status.js`, this.reservationStatus.bind(this));
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async index(req, res) {
    const reservations = await this.reservationService.getByStatus(reservationStatuses.PAID, reservationStatuses.PENDING);
    res.render(`${this.RESERVATION_VIEWS_DIR}/manage.njk`, {
      title: 'Últimas Reservas - Rent a Car',
      reservations
    });
  }

  async reservationStatus(req, res) {
    res.send(`window.ReservationStatus = ${JSON.stringify(reservationStatuses)}`);
  }
};
