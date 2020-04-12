import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native-elements';
import { StyleSheet, View, Text, TextInput, FlatList } from 'react-native';

export default function App() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [result, setResult] = useState('');
  const [data, setData] = useState([]);
  
  const add = () =>{
    if (isNaN(parseInt(text1)) || isNaN(parseInt(text2))) {
      setResult(0);
    }
    else {
      const sum = parseInt(text1) + parseInt(text2);
      setResult(sum);
      const text = text1 + " + " + text2 + " = " + sum; 
      setData([...data, {key:text}]);
      setText1('');
      setText2('');
      this.firstTextInput.focus();
    }
  }

  const subtract = () =>{
    if (isNaN(parseInt(text1)) || isNaN(parseInt(text2))) {
      setResult(0);
    }
    else {
      const subtraction = parseInt(text1) - parseInt(text2);
      setResult(subtraction);
      const text = text1 + " - " + text2 + " = " + subtraction; 
      setData([...data, {key:text}]);
      setText1('');
      setText2('');
      this.firstTextInput.focus();
    }
  }

  function HistoryScreen({route, navigation}) {
    const { data } = route.params;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>History</Text>
        <FlatList
          data={data}
          renderItem={({item}) =>
          <Text>{item.key}</Text>}
        />
      </View>
    );
  }

  function HomeScreen({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Result: {result}</Text>
        <TextInput
          style={{ height: 40, width: "60%", borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text1 => setText1(text1)} 
          value={text1}
          keyboardType={'numeric'}
          ref={(input) => { this.firstTextInput = input; }}
        />
        <TextInput
          style={{ height: 40, width: "60%", borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text2 => setText2(text2)} 
          value={text2}
          keyboardType={'numeric'}
        />
        <View style={styles.buttons}>
          <Button buttonStyle={styles.button} onPress={add} title="+" />
          <Button buttonStyle={styles.button} onPress={subtract} title="-" />
          <Button buttonStyle={styles.button} onPress={() => navigation.navigate('History', {data: data})} title="HISTORY"/>
        </View>
      </View>
    );
  }

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Calculator">
        <Stack.Screen name="Calculator" component={HomeScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#00aeef',
    borderRadius: 5,
    padding: 10,
    margin: 10,       
 }
});
