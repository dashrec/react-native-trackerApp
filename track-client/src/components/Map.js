import React, { useContext } from "react";
import { StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Polyline, Circle } from "react-native-maps";
import { Context as LocationContext } from "../context/LocationContext";

const Map = () => {

  const {state: { currentLocation, locations } } = useContext(LocationContext);



  if (!currentLocation) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />; // spinner
  }

  initialLocation = {
    longitude: 13.372760,
    latitude: 52.463490,
  };

  return (
    <MapView
      zoomEnabled={true}
      style={styles.map}
      initialRegion={{ // indication of what the map should show when it first gets rendered on the screen.
        ...initialLocation,
        latitudeDelta: 0.02, // zoom
        longitudeDelta: 0.02,
      }}
      region={{ // follows user on the map
        ...currentLocation.coords,
         latitudeDelta: 0.02, 
         longitudeDelta: 0.02,
      }}
    >
      
      <Circle
        center={currentLocation.coords}
        radius={40}
        strokeColor="rgb(255, 0, 0)"
        fillColor="rgb(132, 133, 233)"
      />
      <Polyline coordinates={locations.map((loc) => loc.coords)} />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});

export default Map;
