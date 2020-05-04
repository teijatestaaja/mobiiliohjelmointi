import React, { useState, useEffect } from 'react';
import { Header, Button, Input, ListItem } from 'react-native-elements';
import { StyleSheet, View, Text, FlatList} from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("addressdb.db");

export default function App() {
  const [address, setAddress] = useState('');
  const [addresslist, setAddresslist] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists address (id integer primary key not null, address text);');
    });
    updateList();    
  }, []);

  const saveItem = () => {
    db.transaction(tx => {
        tx.executeSql('insert into address (address) values (?);', [address]);    
      }, null, updateList
    )
    setAddress('');
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from address;', [], (_, { rows }) =>
        setAddresslist(rows._array)
      ); 
    });
  }

  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from address where id = ?;`, [id]);
      }, null, updateList
    );    
  }

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <ListItem
      title={item.address}
      rightSubtitle={<Text>show on map</Text>}
      onLongPress={() => deleteItem(item.id)}
      bottomDivider
      chevron
    />
  )
  return (
    <View style={styles.container}>
      <Header
        centerComponent={{ text: 'MY PLACES', style: { color: '#fff' } }}
      />
      <Input placeholder='Type in address' label='PLACEFINDER'
        onChangeText={(address) => setAddress(address)}
        value={address}/>      
      <Button style={styles.button} raised icon={{name:'save'}} onPress={saveItem} title="SAVE"/>
      <FlatList
        keyExtractor={keyExtractor} 
        renderItem={renderItem}
        data={addresslist}
      />         
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  }, 
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  button: {
    margin: 10,
  },
});