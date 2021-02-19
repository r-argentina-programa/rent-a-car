require('dotenv').config();
const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');

const configureDIC = require('./config/di');
const { initCarModule } = require('./module/car/module');
const { initUserModule } = require('./module/user/module');
const { initReservationModule } = require('./module/reservation/module');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

nunjucks.configure('src/module', {
  autoescape: true,
  express: app,
});

const container = configureDIC();

initCarModule(app, container);
initUserModule(app, container);
initReservationModule(app, container);

/**
 * @type {import('./module/default/controller/defaultController')} defaultController
 */
const defaultController = container.get('DefaultController');
defaultController.configureRoutes(app);

app.use(function (err, req, res, next) {
  res.status(500);
  res.render(`default/views/error.njk`, {
    title: 'Error',
    error: err,
  });
});

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
