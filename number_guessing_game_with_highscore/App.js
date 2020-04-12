import React, {useState} from 'react';
import { AsyncStorage, Alert } from'react-native';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

export default function App() {

  const [secretNumber, setNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guessedNumber, setValue] = useState('');
  const [result, setResult] = useState('Guess a number between 1-100');
  const [total, setTotal] = useState(0);
  const [savedHighscore, setHighscore] = useState(100);

  const checkGuess = async () => {
    if (isNaN(guessedNumber)) {
      setValue(0);
    }
    const newTotal = total + 1;
    setTotal(newTotal);

    if (guessedNumber == secretNumber) {
      Alert.alert('You guessed the number in ' + newTotal + ' guesses')
      if (newTotal <= savedHighscore) {
        const newHighscore = JSON.stringify(newTotal);
        try {
          await AsyncStorage.setItem('highscore', newHighscore);
          setHighscore(newTotal);
          Alert.alert('New highscore!');
        } catch (error) {
          Alert.alert('Error saving data');
        }
      }
      setNumber(Math.floor(Math.random() * 100) + 1);
      setResult('Guess a number between 1-100');
      setTotal(0);
    } else if (guessedNumber > secretNumber) {
      setResult('Your guess ' + guessedNumber + ' is too high');
    } else {
      setResult('Your guess ' + guessedNumber + ' is too low');
    }
    setValue('');
  }

  return (
    <View style={styles.container}>
      <Text>{result}</Text>
      <TextInput
        style={{ height: 40, width: "50%", borderColor: 'gray', borderWidth: 1 }}
        onChangeText={guessedNumber => setValue(guessedNumber)} 
        value={guessedNumber}
        keyboardType={'numeric'}
      />
      <Button buttonStyle={styles.button} onPress={checkGuess} title="MAKE GUESS"/>
      <Text>Highscore: {savedHighscore}</Text>
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
