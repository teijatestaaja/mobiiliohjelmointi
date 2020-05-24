import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, Alert } from 'react-native';
import { Button, Input, ListItem } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("keyworddb.db");

export default function Home(props) {
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState('');
  const [countries, setCountries] = useState([]);
  const [results, setResults] = useState([]);
  const [searches, setSearch] = useState([]);

  const { navigation } = props;

  useEffect(() => {     
    getCountries();
  }, [])

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists keyword (id integer primary key not null, keyword text);');
    });
    updateList();    
  }, []);

  const saveItem = () => {
    db.transaction(tx => {
        tx.executeSql('insert into keyword (keyword) values (?);', [keyword]);    
      }, null, updateList
    )
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from keyword;', [], (_, { rows }) =>
        setSearch(rows._array)
      ); 
    });
  }

  const deleteHistory = (id) => {
    db.transaction(
      tx => {
        tx.executeSql('delete from keyword', []);
      }, null, updateList
    );    
  }

  // Haetaan kaikki maat muistiin
  const getCountries = () => {
    const url = 'https://restcountries.eu/rest/v2/all';
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => { 
      setCountries(responseJson);
    })
    .catch((error) => { 
      Alert.alert('Virhe: ' , error); 
    }); 
  }

  const searchItem = () => {
    // Tyhjennetään edelliset hakutulokset
    setResults([]);

    // Jos hakusanaa ei annettu
    if(keyword === ""){
      setError('Et antanut hakusanaa!');
      return;
    }

    // Tallennetaan hakusana käytettyihin hakusanoihin
    saveItem();

    // Filtteröidään hakutulosten mukaan
    var filteredCountries = keyword === '' ? countries : countries.filter(
      (country) => {
        if(country.name.toLowerCase().includes(keyword.toLowerCase())) return country.name
        else return ""
      }
    )
    
    // Jos hakusanalla ei löytynyt maata
    if(filteredCountries.length == 0){
      setError("Annetulla hakusanalla ei löytynyt maata!");
      setKeyword('');
      return; 
    }

    // Jos hakusanalla löytyy yli 10 maata, näytetään virhe
    if(filteredCountries.length >= 10){
      setError("Liikaa hakutuloksia, tarkenna hakuehtoa!");
      setKeyword('');
      return; 
    }

    // Muuten näytetään lista maista
    setResults(filteredCountries);
    setError("");
    setKeyword('');
  }
  
  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      rightSubtitle={<Text>Näytä tiedot</Text>}
      onPress={() => navigation.navigate('CountryInfo', {country: item})}
      bottomDivider
      chevron
    />
  )

  return (
    <View style={styles.container}>
      <Input placeholder='hakusana englanniksi' label='Hae maa'
        onChangeText={(keyword) => setKeyword(keyword)}
        value={keyword}/>  
      <Text style={styles.error}>{error}</Text>
      <View style={styles.buttons}>
        <Button style={styles.button} onPress={searchItem} title="Hae"/>
        <Button style={styles.button} onPress={() => navigation.navigate('SearchHistory', {history: searches})} title="Hakuhistoria" />
        <Button style={styles.button} onPress={deleteHistory} title="Tyhjennä hakuhistoria" />
      </View>
      <FlatList
        keyExtractor={keyExtractor} 
        renderItem={renderItem}
        data={results}
      />      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    margin: 10,
    width: 120,
  },
  error: {
    margin: 10,
    color: '#b80000',
  },
});