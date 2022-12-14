const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');
const cron = require('node-cron');
const config = require('./config/config');
const morgan = require('./config/morgan');
const routes = require('./routes');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const updateAttendeeService = require('./services/event.service');

const app = express();

// registering cron job

//             ┌────────────── second (0 - 59) (optional)
//             │ ┌──────────── minute (0 - 59)
//             │ │ ┌────────── hour (0 - 23)
//             │ │ │ ┌──────── day of the month (1 - 31)
//             │ │ │ │ ┌────── month (1 - 12)
//             │ │ │ │ │ ┌──── day of the week (0 - 6) (0 and 7 both represent Sunday)
//             │ │ │ │ │ │
//             │ │ │ │ │ │
//             * * * * * *

cron.schedule('1 * * * * *', async function () {
  await updateAttendeeService();
});

// Cron job end

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// v1 api routes
app.use('/', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
