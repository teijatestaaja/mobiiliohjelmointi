import React, {useState} from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, View, Text, TextInput, FlatList} from 'react-native';

export default function App() {
  const [item, setItem] = useState('');
  const [data, setData] = useState([]);

  const add = () =>{
    if (item != '') {
      setData([...data, {key:item}]);
    }
    setItem('');
  }

  const clear = () =>{
    let empty = [''];
    setData(...empty);
    setItem('');
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={{ height: 40, width: "60%", borderColor: 'gray', borderWidth: 1 }}
        onChangeText={item => setItem(item)} 
        value={item}
      />
      <View style={styles.buttons}>
        <Button buttonStyle={styles.button} onPress={add} title="ADD" />
        <Button buttonStyle={styles.button} onPress={clear} title="CLEAR" />
      </View>
      <Text>Shopping List</Text>
      <FlatList
        data={data}
        renderItem={({item}) =>
            <Text>{item.key}</Text>}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
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
