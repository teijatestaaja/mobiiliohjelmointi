import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { SvgUri } from 'react-native-svg';

export default function CountryInfo(props) { 
  const { route } = props;
  const { country } = route.params;

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <ListItem
        title={item.name}
    />
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{country.name}</Text>
      <SvgUri
        width="300"
        height="100"
        uri={country.flag}
      />
      <Text style={styles.row}>Pääkaupunki: {country.capital}</Text>
      <Text style={styles.row}>Asukasluku: {country.population}</Text>  
      <Text style={styles.row}>Kielet:</Text>
      <FlatList
        keyExtractor={keyExtractor}
        data={country.languages}
        renderItem={renderItem}
      />
    </View>
  );
}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 20,
      },
      title: {
        margin: 10,
        fontSize: 20,
      },
      row: {
        margin: 10,  
      },
      flag: {
        margin: 10,
      }
});