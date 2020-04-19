import React, { useEffect, useState } from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, TextInput, View, FlatList, Alert } from 'react-native';

export default function App() {
  const [text, setText] = useState('');
  const [recipes, setRecipes] = useState([]);
 
  const search = () => {
    const url= 'http://www.recipepuppy.com/api/?i=' + text;
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      setRecipes([recipes, responseJson.results]);
    })
    .catch((error) => {
      Alert.alert('Error on fetching recipes', error);
    });
  }

  /*
  useEffect(() => {
    search();
  }, []);
*/

  return (
    <View style={styles.container}>
      <TextInput
        style={{ height: 40, width: "60%", borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setText(text)} 
        value={text}
      />
      <Button buttonStyle={styles.button} onPress={search} title="FIND" />
      <FlatList
        data={recipes}
        renderItem={({item, index}) => (
          <View key={index}>
                <Text>{item}</Text>
          </View>
        )}
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
  button: {
    backgroundColor: '#00aeef',
    borderRadius: 5,
    padding: 10,
    margin: 10,       
  },
});
