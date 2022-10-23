const httpStatus = require('http-status');

const auth = () => async (req, res, next) => {
  if (!req.headers.authorization || req.headers.authorization.split(' ')[1] !== process.env.SECRET) {
    return res.status(httpStatus.UNAUTHORIZED).json({ error: 'Please authenticate' });
  }
  next();
};

module.exports = auth;
