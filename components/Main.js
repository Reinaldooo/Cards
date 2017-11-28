import React from 'react';
import { StyleSheet, Text, View, ScrollView, AsyncStorage } from 'react-native'
import Header from './Header'
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
    const { container, text } = styles
    {console.log(this.props)}
    return (
      <View>
      {/* <Header header="UdaciCards"  /> */}
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
