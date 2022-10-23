const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { Event } = require('../models/index');

// Create New Event
const createEvent = catchAsync(async (req, res) => {
  const { name, description, eventAt, isActive, price, location } = req.body;
  return Event.create({
    name,
    description,
    eventAt,
    isActive,
    price,
    location,
  })
    .then((event) => res.status(httpStatus.OK).send(event))
    .catch((error) => res.status(httpStatus.BAD_REQUEST).send(error));
});

// Get all Events
const getEvents = catchAsync(async (req, res) => {
  return Event.findAll()
    .then((events) => res.status(httpStatus.OK).send(events))
    .catch((error) => res.status(httpStatus.BAD_REQUEST).send(error));
});

// get a single Event
const getEvent = catchAsync(async (req, res) => {
  const { Id } = req.params;
  return Event.findByPk(Id)
    .then((event) => res.status(httpStatus.OK).send(event))
    .catch((error) => res.status(httpStatus.BAD_REQUEST).send(error));
});

// update a single event
const updateEvent = catchAsync(async (req, res) => {
  const { name, description, eventAt, isActive, price, location } = req.body;
  const { Id } = req.params;

  return Event.update(
    { name, description, eventAt, isActive, price, location },
    {
      where: {
        id: Id,
      },
    }
  )
    .then((event) => res.status(httpStatus.OK).send(event))
    .catch((error) => res.status(httpStatus.BAD_REQUEST).send(error));
});

// delete a single event by id
const deleteEvent = catchAsync(async (req, res) => {
  const { Id } = req.params;
  return Event.destroy({
    where: {
      id: Id,
    },
  })
    .then((event) => res.status(httpStatus.OK).send(event))
    .catch((error) => res.status(httpStatus.BAD_REQUEST).send(error));
});

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};
