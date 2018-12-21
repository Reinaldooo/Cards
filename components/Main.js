import React from 'react';
import { View, FlatList, AsyncStorage, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import DeckContainer from './DeckContainer';
import { parseDecks } from '../utils/helper'
import { white } from '../utils/colorNames'

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
        {(this.state.decks[0] && this.state.decks[0].title) ?
          <FlatList
            data={this.state.decks}
            onRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', padding: '5%', paddingBottom: '10%' }}
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