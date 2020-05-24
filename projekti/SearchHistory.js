import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

export default function SearchHistory(props) {
  
  const { route } = props;
  const { history } = route.params;

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Olet hakenut seuraavilla hakusanoilla:</Text>
        <FlatList 
          style={{marginLeft : "5%"}}
          keyExtractor={item => item.id.toString()} 
          renderItem={({item}) => <Text style={{fontSize: 12}}>{item.keyword}</Text>} 
          data={history}
      />      
    </View>
  );
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }, title: {
    margin: 10,
    fontSize: 20,
  },
});