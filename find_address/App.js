import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const [text, setText] = useState('');
  const [lat, setLat] = useState(60.166628);
  const [lng, setLng] = useState(24.943508);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Ei lupaa käsitellä paikkatietoa!');
    } else {
      let location = await Location.getCurrentPositionAsync({});
      setLat(location.coords.latitude)
      setLng(location.coords.longitude)
      //DEBUG console.log(location)
    }
  };

  // MapQuest
  // http://www.mapquestapi.com/geocoding/v1/address?key=MY_KEY&location=
  const find = () => {
    const url = 'http://www.mapquestapi.com/geocoding/v1/address?key=MY_KEY&location=' + text;
    fetch(url)
    .then(resp => resp.json())
    .then(respJson => {
      let location = respJson.results[0].locations[0].latLng;
      setLat(location.lat);
      setLng(location.lng);
      //DEBUG console.log(respJson.results)
    })
  };

  return (
    <View style={styles.container}>
      <MapView
      region={{
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221
      }}
      >
        <Marker 
          coordinate={{
            latitude: lat,
            longitude: lng
          }}
        />
      </MapView>
      <TextInput
        style={{ height: 40, width: "30%", borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setText(text)} 
        value={text}
      />
      
      <Button buttonStyle={styles.button} onPress={find} title="SHOW" />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  button: {
    backgroundColor: '#00aeef',
    borderRadius: 5,
    padding: 10,
    margin: 10,       
 }
});