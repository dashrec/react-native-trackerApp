const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
//express api route handler

// A router is essentially a little object that allows us to associate some number of route handlers with it. We can then take that router and associate it back with our app object that we created inside of index.js.
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, keys.cookieKey);
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});


router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(422).send({ error: 'Invalid password or email' });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, keys.cookieKey);

    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: 'Invalid password or email' });
  }
});

module.exports = router;
