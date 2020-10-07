const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = {
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, config.get('jwtSecret'), {
      expiresIn: config.get('expiration'),
    });
  },
};
