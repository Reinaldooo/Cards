import React from 'react';
import { StyleSheet, View, ScrollView, AsyncStorage, TouchableOpacity } from 'react-native';
import DeckContainer from './DeckContainer';


export default class Main extends React.Component {
  state = {
  }

  componentDidMount() {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, decks) => {
       this.setState({ decks: decks.filter((deck) => deck[0] !== "UdaciCards:notifications" && deck[0] !== "reminderSet") });
      });
    });
  }
  componentWillReceiveProps(nextProps) {
    nextProps.navigation.state.params &&
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, decks) => {
        this.setState({ decks: decks.filter((deck) => deck[0] !== "UdaciCards:notifications" && deck[0] !== "reminderSet") });
      });
    });
  }

  render() {
    const { textStyle, mainContainer, btn } = styles;
    return (
      <View style={{ backgroundColor: '#333333', flex: 1, paddingTop: 20 }}>
        <ScrollView>
          {this.state.decks ? this.state.decks.map((deck) => 
            <DeckContainer
              navigation={this.props.navigation}
              key={JSON.parse(deck[1]).id}
              deckName={JSON.parse(deck[1]).title}
              questions={JSON.parse(deck[1]).questions.length}
              deckId={JSON.parse(deck[1]).id}
              tried={JSON.parse(deck[1]).tried}
            />)
          :
            <DeckContainer deckName="Please wait..." questions="Loading" />
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50
  },
  textStyle: {
    fontSize: 30,
    color: 'white'
  },
  btn: {
    borderRadius: 5,
    padding: 5,
    marginTop: 90,
    borderWidth: 1.5,
    borderColor: '#E53935',    
    alignItems: 'center'
  }
});