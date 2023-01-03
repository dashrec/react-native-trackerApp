const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const keys = require('../config/keys');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // authorization === "Bearer akfhalskfasfasfas"
  if (!authorization) {
    return res.status(401).send({ error: 'You must be logged in' });
  }

  //get just a token string
  const token = authorization.replace('Bearer ', '');

  jwt.verify(token, keys.cookieKey, async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: 'you must be logged in.' });
    }
    const { userId } = payload;
    const user = await User.findById(userId);

    req.user=user;
    next();
  });
};

// So payload is going to be whatever information we stuck into our JSON Web Token. like this right here {userId: user._id}
