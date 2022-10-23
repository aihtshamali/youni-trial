const Joi = require('joi');

const createEvent = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().default(0),
    location: Joi.string(),
    isActive: Joi.boolean().default(false),
    eventAt: Joi.date().required(),
  }),
};

const getEvents = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getEvent = {
  params: Joi.object().keys({
    Id: Joi.number(),
  }),
};

const updateEvent = {
  params: Joi.object().keys({
    Id: Joi.number(),
  }),
  body: Joi.object()
    .keys({
      id: Joi.number(),
      createdAt: Joi.date(),
      updatedAt: Joi.date(),
      attendees: Joi.string(),
      name: Joi.string().required(),
      description: Joi.string(),
      price: Joi.number(),
      location: Joi.string(),
      isActive: Joi.boolean().default(false),
      eventAt: Joi.date().required(),
    })
    .min(1),
};

const deleteEvent = {
  params: Joi.object().keys({
    Id: Joi.number(),
  }),
};

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};
