import React, {  useContext, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus, NavigationEvents } from 'react-navigation';
import Map from '../components/Map';
import '../_mockLocation';

import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';
import { FontAwesome } from '@expo/vector-icons';

// isFocused prop is gonna tell us whether or not this particular component is currently focused or actually visible on the screen.
const TrackCreateScreen = ({isFocused}) => {

  const {state:{recording}, addLocation } = useContext(LocationContext);
// sec arg as func location is call back passed in useLocation
// const [err] = useLocation(isFocused, location => { addLocation(location, state.recording) } ); // pass callback from hook to addLocation function to sent in LocationContext
//receive err if occurs when we try to aks for permissions

// so the entire goal of useCallback is to limit the number of times that we create a new callback function.
const callback = useCallback(location => {
    addLocation(location, recording); //   recording: true  or false
  }, [recording] // useEffect in useLocation func will be called only if state.recording gets changed
);

// we can imagine  addLocation(location) on place of callback that passes location to LocationContext
const [err] = useLocation(isFocused || recording, callback); // if any of isFocused || recording is true start watching

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text h4 style={{ marginTop: 12 }}>
        Create a Track
      </Text>
      <Map />
     {/*  <NavigationEvents onWillBlur={()=> console.log('leaving..')} /> */}
      {err ? <Text>Please enable location services</Text> : null}
      <TrackForm />
    </SafeAreaView>
  );
};

TrackCreateScreen.navigationOptions = {
  title: 'Add Track',
  tabBarIcon: <FontAwesome name="plus" size={20} />
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);
