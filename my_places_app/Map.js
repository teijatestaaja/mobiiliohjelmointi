import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Map(props) {
  useEffect(() => {
    findLocation();
  }, [])
  
  const { route } = props;
  const { selectedLocation } = route.params;
  
  const [lat, setLat] = useState(60.166628);
  const [lng, setLng] = useState(24.943508);
  
  // MapQuest
  // http://www.mapquestapi.com/geocoding/v1/address?key=MY_KEY&location=
  const findLocation = () => {
    const url = 'http://www.mapquestapi.com/geocoding/v1/address?key=MY_KEY&location=' + selectedLocation;
    fetch(url)
    .then(resp => resp.json())
    .then(respJson => {
      let location = respJson.results[0].locations[0].latLng;
      setLat(location.lat);
      setLng(location.lng);
      //DEBUG console.log(respJson.results)
    })
  }
              
  return (
    <MapView
     style={styles.map}
     initialRegion={{
       latitude: lat,
       longitude: lng,
       latitudeDelta: 0.0322,
       longitudeDelta: 0.0221
     }}>
       <Marker 
         coordinate={{
           latitude: lat,
           longitude: lng
         }}
         title={selectedLocation}
       />
    </MapView>
  );
}
  
const styles = StyleSheet.create({
  map: {
    flex: 1
  },
});