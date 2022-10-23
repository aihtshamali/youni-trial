const { Event } = require('../models/index');

const updateAttendeeService = () => {
  // random number b/w 1 - 10
  const randomAttendee = Math.floor(Math.random() * 10) + 1;
  //   console.log('sadf', randomAttendee);
  return Event.update(
    { attendees: randomAttendee },
    {
      where: {
        isActive: true,
        // eventAt: {
        //   [Op.gte]: new Date(),
        // },
      },
    }
  );
};

module.exports = updateAttendeeService;
