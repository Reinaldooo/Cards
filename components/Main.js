import React from 'react';
import { View, FlatList, AsyncStorage, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import DeckContainer from './DeckContainer';
import { parseDecks } from '../utils/helper'

export default class Main extends React.Component {
  state = {
    decks: [],
    refreshing: false
  }

  handleRefresh = () => {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, decks) => {
        console.log(parseDecks(decks))
        this.setState({ decks: parseDecks(decks), refreshing: false });
      });
    }).catch((e) => console.log(e));
  }

  componentDidMount() {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, decks) => {
        this.setState({ decks: parseDecks(decks) });
      });
    }).catch((e) => console.log(e));
  }

  componentDidUpdate(nextProps) {
    if (nextProps.navigation.state.params) {
      if (nextProps.navigation.state.params !== this.props.navigation.state.params) {
        AsyncStorage.getAllKeys((err, keys) => {
          AsyncStorage.multiGet(keys, (err, decks) => {
            this.setState({ decks: parseDecks(decks) });
          });
        }).catch((e) => console.log(e));
      }
    }
  }

  render() {
    return (
      <View style={{ backgroundColor: '#FAFAFA', flex: 1, paddingTop: 20 }}>
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
          <View>
            <ActivityIndicator size="large" color='#424242' />
            <TouchableOpacity
              style={styles.btnFocus}
              onPress={this.handleRefresh}
            >
              <Text style={{ fontSize: 20, color: '#424242', textAlign: 'center' }}>Refresh</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnFocus: {
    borderRadius: 5,
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    marginVertical: 10, 
    marginHorizontal: 80, 
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E53935',
    marginTop: 15
  }
});