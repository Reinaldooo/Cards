import React from 'react';
import { StyleSheet, Text, View, ScrollView, AsyncStorage } from 'react-native'
import DeckContainer from './DeckContainer'
import { createDecks } from '../utils/API'


export default class Main extends React.Component {
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
    return (
      <View style={{backgroundColor: 'white'}}>
      <ScrollView>
      {this.state.decks ? this.state.decks.map((deck) => 
        <DeckContainer navigation={this.props.navigation} key={JSON.parse(deck[1]).id} deckName={JSON.parse(deck[1]).title} questions={JSON.parse(deck[1]).questions.length}/>
      ) :
        <DeckContainer deckName="Loading..." questions="Please wait"/>
      }
      </ScrollView>
      </View>
    );
  }
}
