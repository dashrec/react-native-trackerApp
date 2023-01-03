import { useState, useEffect } from 'react';
import {
  Accuracy,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
} from 'expo-location';



// shouldTrack can be either isFocused || recording. callback  
export default (shouldTrack, callback) => { // ges isFocused and call it shouldTrack, that tells us weather or not we start tracking. input of callback func to run any time we get an update
  const [err, setErr] = useState(null);
 // const [subscriber, setSubscriber] = useState(null);

  useEffect(() => {
    let subscriber;
    const startWatching = async () => {
      try {
        const { granted } = await requestForegroundPermissionsAsync();
        if (!granted) {
          throw new Error('Location permission not granted');
        }
  
  // The way in which we disable tracking whenever we call watch position async, this is going to eventually give us back a value called subscriber. And on this value right here is a function called remove.
        subscriber = await watchPositionAsync( //anytime get position update and call callback
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          callback // seq arg to watchPositionAsync, new location
        );
             
      } catch (e) {
        setErr(e);
      }
    };
    if(shouldTrack){
      startWatching();
    }else {

      if(subscriber) { 
        subscriber.remove(); // if Track CreateComponent is not visible on screen disable watching by subscriber.remove
      } 
      subscriber = null;
    }
   return () => {//sec time call of useEffect will see this return clean up from the first time and before start watching it gonna call the cleanup func we return from first call  
    if(subscriber) { 
      subscriber.remove(); // stop location tracking
    } 
   }

  }, [shouldTrack, callback]);

  return [err]; // error if one occurs during the permissions process
};
