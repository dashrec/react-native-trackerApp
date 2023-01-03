const express = require('express');
require('./models/User');
require('./models/Track');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const requireAuth = require('./middlewares/requireAuth');
const trackRoutes = require('./routes/trackRoutes');
const keys = require('./config/keys');

const app = express();
app.use(bodyParser.json());

app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = keys.mongoURI;

mongoose.set('strictQuery', false);
mongoose.connect(mongoUri);

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to mongo', err);
});
mongoose.set('strictQuery', false);

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
