import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './Home'
import PlacesList from './PlacesList';
import Map from './Map';

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name='Home' component={Home} options={{ title: 'My Places' }} />
        <Stack.Screen name='Map' component={Map} options={{ title: 'Map' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  return <MainStackNavigator />
}