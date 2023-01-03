// prod.js - production keys here!!
module.exports = {

  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
};

// So we want to make sure that we export a object  where the values inside that object are being pulled from environment variables in the Heroku environment.