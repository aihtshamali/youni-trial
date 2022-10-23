const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const eventValidation = require('../validations/event.validation');
const eventController = require('../controllers/event.controller');

const router = express.Router();

router
  .route('/events')
  .get(auth('/'), eventController.getEvents)
  .post(auth('/'), validate(eventValidation.createEvent), eventController.createEvent);

router
  .route('/events/:Id')
  .get(auth('/'), validate(eventValidation.getEvent), eventController.getEvent)
  .patch(auth('/'), validate(eventValidation.updateEvent), eventController.updateEvent)
  .delete(auth('/'), validate(eventValidation.deleteEvent), eventController.deleteEvent);

module.exports = router;
