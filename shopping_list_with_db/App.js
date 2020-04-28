import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, View, Text, TextInput, FlatList} from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("productsdb.db");

export default function App() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists products (id integer primary key not null, name text, amount text);');
    });
    updateList();    
  }, []);

  const saveItem = () => {
    db.transaction(tx => {
        tx.executeSql('insert into products (name, amount) values (?, ?);', [name, amount]);    
      }, null, updateList
    )
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from products;', [], (_, { rows }) =>
        setProducts(rows._array)
      ); 
    });
  }

  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from products where id = ?;`, [id]);
      }, null, updateList
    );    
  }

  const clear = () => {
    setName('');
    setAmount('');
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder='Product' style={{ height: 40, width: "60%", borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(name) => setName(name)}
        value={name}/>  
      <TextInput placeholder='Amount' style={{ height: 40, width: "60%", borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(amount) => setAmount(amount)}
        value={amount}/>      
      <View style={styles.buttons}>
        <Button buttonStyle={styles.button} onPress={saveItem} title="SAVE" />
        <Button buttonStyle={styles.button} onPress={clear} title="CLEAR" />
      </View>
      <Text style={{marginTop: 30, fontSize: 20}}>Shopping List</Text>
      <FlatList 
        style={{marginLeft : "5%"}}
        keyExtractor={item => item.id.toString()} 
        renderItem={({item}) => <View style={styles.listcontainer}><Text style={{fontSize: 16}}>{item.name}, {item.amount}</Text>
        <Text style={{fontSize: 16, color: '#0000ff'}} onPress={() => deleteItem(item.id)}> Bought</Text></View>} 
        data={products}
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
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
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
