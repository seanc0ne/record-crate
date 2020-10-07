const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = {
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, config.get('jwtSecret'), {
      expiresIn: config.get('expiration'),
    });
  },
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    // separate "Bearer" from "<tokenvalue>"
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
    // if no token, return request object as is
    if (!token) {
      return req;
    }
    try {
      // decode and attach user data to request object
      const { data } = jwt.verify(token, config.get('jwtSecret'), {
        maxAge: config.get('expiration'),
      });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }
    // return updated request object
    return req;
  },
};
