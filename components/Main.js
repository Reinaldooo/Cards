import React from 'react';
import { StyleSheet, View, FlatList, AsyncStorage } from 'react-native';
import sortBy from 'sort-by';
import DeckContainer from './DeckContainer';


export default class Main extends React.Component {
  state = {
  }

  componentDidMount() {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, decks) => {
       this.setState({ decks: decks.filter((deck) => deck[0] !== "UdaciCards:notifications" && deck[0] !== "reminderSet")
       .map(deck => JSON.parse(deck[1]))
       .sort(sortBy('title'))
       });       
        console.log(this.state)
      });      
    });
  }
  componentWillReceiveProps(nextProps) {
    nextProps.navigation.state.params &&
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, decks) => {
        this.setState({ decks: decks.filter((deck) => deck[0] !== "UdaciCards:notifications" && deck[0] !== "reminderSet")
        .map(deck => JSON.parse(deck[1]))
        .sort(sortBy('title'))
        });
        console.log(this.state);
        console.log("Depois");
      });
    });
  }

  render() {
    return (
      <View style={{ backgroundColor: '#333333', flex: 1, paddingTop: 20 }}>
          {this.state.decks ?
            <FlatList
              data={this.state.decks}
              renderItem={({item}) => 
                <DeckContainer
                navigation={this.props.navigation}
                key={item.id}
                deckName={item.title}
                questions={item.questions.length}
                deckId={item.id}
                tried={item.tried}
                />
            }/>
          :
            <DeckContainer deckName="Please wait..." questions="Loading" />
          }
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