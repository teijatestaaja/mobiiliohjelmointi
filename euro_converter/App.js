import React, {useState, useEffect} from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, View, Text, TextInput, Picker} from 'react-native';

export default function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [rates, setRates] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  
  useEffect(() => {  
    getRates();
  }, []);

  // Used to debug
  const getRates = () => {
    setRates({
      EUR: 1,
      GBP: 0.877513,
      NOK: 11.27799,
      SEK: 10.971361,
      USD: 1.079092,
    });
    };
  

  /* Fetch Rates from Api
  const getRates = () => {
    const url = 'http://data.fixer.io/api/latest?access_key=YOUR_KEY&base=EUR&rates';
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => { 
       setRates(responseJson);
    })
    .catch((error) => { 
      Alert.alert('Virhe: ' , error); 
    }); 
  }*/

  const convert = () =>{
    var result = parseFloat(text) / parseFloat(selectedValue);
    setResult(parseFloat(result).toFixed(2));
  }

  return (
    <View style={styles.container}>
      <Text>Result: {result} €</Text>
      <TextInput
        style={{ height: 40, width: "30%", borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setText(text)} 
        value={text}
        keyboardType={'numeric'}
      />
      
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        {Object.keys(rates).map((key) => {
        return (<Picker.Item label={key} value={rates[key]} key={key}/>) // map rates to picker
        })}
      </Picker>
      <View style={styles.buttons}>
        <Button buttonStyle={styles.button} onPress={convert} title="CONVERT" />
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
