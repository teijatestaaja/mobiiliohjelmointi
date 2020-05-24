import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './Home'
import CountryInfo from './CountryInfo';
import SearchHistory from './SearchHistory';

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name='Home' component={Home} options={{ title: 'Maiden haku' }} />
        <Stack.Screen name='CountryInfo' component={CountryInfo} options={{ title: 'Maan tiedot' }} />
        <Stack.Screen name='SearchHistory' component={SearchHistory} options={{ title: 'Hakuhistoria' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  return <MainStackNavigator />
}