import React from 'react';
import { StyleSheet, Text, View, ScrollView, AsyncStorage } from 'react-native'
import Header from './Header'
import DeckContainer from './DeckContainer'
import { createDecks } from '../utils/API'


export default class ViewDeck extends React.Component {
  state = {}

  componentDidMount() {
    AsyncStorage.clear();
    createDecks();
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, decks) => {
       this.setState({ decks })
      });
    });
  }
 
  render() {
    const { container, text } = styles
    return (
      <View>
          <Text>LOL</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 55, 
  }
});
