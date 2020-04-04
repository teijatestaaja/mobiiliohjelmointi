import React, {useState} from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, View, Text, TextInput} from 'react-native';

export default function App() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [result, setResult] = useState('');
  
  const add = () =>{
    if (isNaN(text1) || isNaN(text2)) {
      setResult(0);
    }
    else setResult(parseInt(text1) + parseInt(text2));
  }

  const subtract = () =>{
    if (isNaN(text1) || isNaN(text2)) {
      setResult(0);
    }
    else setResult(parseInt(text1) - parseInt(text2));
  }

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <TextInput
        style={{ height: 40, width: "60%", borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text1 => setText1(text1)} 
        value={text1}
        keyboardType={'numeric'}
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
      </View>
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
