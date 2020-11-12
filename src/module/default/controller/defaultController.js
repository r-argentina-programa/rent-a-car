module.exports = class DefaultController {
  constructor() {
    this.ROUTE_BASE = '/';
    this.VIEWS_DIR = 'default/views';
  }

  /**
   * @param {import('express').Application} app
   */
  configureRoutes(app) {
    const ROUTE = this.ROUTE_BASE;
    app.get(`${ROUTE}`, this.index.bind(this));
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async index(req, res) {
    res.render(`${this.VIEWS_DIR}/index.njk`, {
      title: 'Rent a Car',
    });
  }
};
