import * as Location from 'expo-location';

const tenMetersWithDegrees = 0.0001; //around 10 meter representation in longitude and latitude

const getLocation = increment => {
  return {
    timestamp: 100000, //can be n any value
    coords: {
      speed: 0,
      heading: 0,
      accuracy: 5,
      altitudeAccuracy: 5,
      altitude: 5,
      longitude: 13.372760 + increment * tenMetersWithDegrees,
      latitude: 52.463490 + increment * tenMetersWithDegrees
    }
  };
};

let counter = 0;
setInterval(() => {
  Location.EventEmitter.emit('Expo.locationChanged', {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter)
  });
  counter++;
}, 1000); // run once every sec
