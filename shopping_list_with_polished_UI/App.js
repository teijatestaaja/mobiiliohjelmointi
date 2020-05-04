import React, { useState, useEffect } from 'react';
import { Header, Button, Input, ListItem } from 'react-native-elements';
import { StyleSheet, View, Text, FlatList} from 'react-native';
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
      <Header
        centerComponent={{ text: 'SHOPPING LIST', style: { color: '#fff' } }}
      />
      <Input placeholder='Product' label='PRODUCT'
        onChangeText={(name) => setName(name)}
        value={name}/>  
      <Input placeholder='Amount' label='AMOUNT'
        onChangeText={(amount) => setAmount(amount)}
        value={amount}/>        
      <View style={styles.buttons}>
        <Button raised icon={{name:'save'}} onPress={saveItem} title="SAVE"/>
        <Button raised icon={{name:'clear'}} onPress={clear} title="CLEAR"/>
      </View>
      <FlatList
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
  }, 
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
});
