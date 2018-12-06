import React from 'react';
import { StyleSheet, View, FlatList, AsyncStorage } from 'react-native';
import sortBy from 'sort-by';
import DeckContainer from './DeckContainer';


export default class Main extends React.Component {
  state = {
    decks: [],
    refreshing: false
  }

  handleRefresh = () => {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, decks) => {
        this.setState({ decks: this.parseDecks(decks), refreshing: false });
      });
    }).catch((e) => console.log(e));
  }

  parseDecks = (decks) => {
    return decks
      //remove notifications and reminders
      .filter((deck) => deck[0] !== "UdaciCards:notifications" && deck[0] !== "reminderSet")
      .map(deck => JSON.parse(deck[1]))
      .sort(sortBy('title'))
  }

  componentDidMount() {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, decks) => {
        this.setState({ decks: this.parseDecks(decks) });
      });
    }).catch((e) => console.log(e));
  }

  componentDidUpdate(nextProps) {
    console.log("DidUpdate" + Date.now())
    if (nextProps.navigation.state.params) {
      if (nextProps.navigation.state.params !== this.props.navigation.state.params) {
        AsyncStorage.getAllKeys((err, keys) => {
          AsyncStorage.multiGet(keys, (err, decks) => {
            this.setState({ decks: this.parseDecks(decks) });
          });
        }).catch((e) => console.log(e));
      }
    }
  }

  render() {
    return (
      <View style={{ backgroundColor: '#2a2a2f', flex: 1, paddingTop: 20 }}>
        {this.state.decks[0] ?
          <FlatList
            data={this.state.decks}
            onRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}
            renderItem={({ item }) =>
              <DeckContainer
                navigation={this.props.navigation}
                key={item.id}
                deckName={item.title}
                questions={item.questions.length}
                deckId={item.id}
                tried={item.tried}
              />
            } />
          :
          <DeckContainer deckName="Please wait..." questions="Loading" />
        }
      </View>
    );
  }
}