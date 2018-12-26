import React from 'react';
import { View, FlatList, AsyncStorage, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import DeckContainer from './DeckContainer';
import { parseDecks } from '@utils/helper'
import { white, blue } from '@utils/colorNames'

export default class Main extends React.Component {
  state = {
    decks: [],
    refreshing: false
  }

  handleRefresh = () => {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, decks) => {
        this.setState({ decks: parseDecks(decks), refreshing: false });
      });
    }).catch((e) => console.log(e));
  }

  componentDidUpdate(prevProps) {
    if(prevProps.screenProps !== this.props.screenProps) {
      this.setState({ decks: this.props.screenProps.decks })
    }
  }

  componentDidMount() {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, decks) => {
        this.setState({ decks: parseDecks(decks) });
      });
    }).catch((e) => console.log(e));
  }

  render() {
    return (
      <View style={{ backgroundColor: white, flex: 1, paddingTop: 20 }}>
        {(this.state.decks[0] && this.state.decks[0] !== null) ?
          <FlatList
            data={this.state.decks}
            onRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', padding: '5%' }}
            renderItem={({ item }) =>
              <DeckContainer
                navigation={this.props.navigation}
                deckName={item.title}
                questions={item.questions.length}
                deckId={item.id}
                tried={item.tried}
              />
            } />
          :
            <ActivityIndicator size="large" color={blue} />
        }
      </View>
    );
  }
}