import React from 'react';
import { StyleSheet, View, ScrollView, AsyncStorage } from 'react-native';
import DeckContainer from './DeckContainer';


export default class Main extends React.Component {
  state = {
  }

  componentDidMount() {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, decks) => {
       this.setState({ decks: decks.filter((deck) => deck[0] !== "UdaciCards:notifications" && deck[0] !== "reminderSet")
       .map(deck => JSON.parse(deck[1]))
       });
       console.log(this.state.decks)
      });
    });
  }
  componentWillReceiveProps(nextProps) {
    nextProps.navigation.state.params &&
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, decks) => {
        this.setState({ decks: decks.filter((deck) => deck[0] !== "UdaciCards:notifications" && deck[0] !== "reminderSet")
        .map(deck => JSON.parse(deck[1]))
        });
      });
    });
  }

  render() {
    return (
      <View style={{ backgroundColor: '#333333', flex: 1, paddingTop: 20 }}>
        <ScrollView>
          {this.state.decks ? this.state.decks.map((deck) => 
            <DeckContainer
              navigation={this.props.navigation}
              key={deck.id}
              deckName={deck.title}
              questions={deck.questions.length}
              deckId={deck.id}
              tried={deck.tried}
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