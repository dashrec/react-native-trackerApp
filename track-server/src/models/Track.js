const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
timestamp: Number,
coords:{
  latitude:Number,
  longitude:Number,
  altitude:Number,
  accuracy:Number,
  heading:Number,
  speed:Number
}
})

const trackSchema = new mongoose.Schema({ 
  userId: { type: mongoose.Schema.Types.ObjectId,   // This is how we indicate that userId is a reference to some other object stored inside of MongoDB.
  ref: 'User' //  essentially tells that this userId is pointing at an instance of a User,
  },
  name: { type: String, default: ''},
  locations: [pointSchema]
});

mongoose.model('Track', trackSchema);



