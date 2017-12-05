import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, AsyncStorage, Platform } from 'react-native';
import { red, white } from '../utils/colorNames';

const CardsCount = ({ questions, textStyle }) => {
  if(questions === 0) {
      return (
          <Text style={textStyle}>No cards yet!</Text>
      );
  } else if(questions === 1) {
      return (
          <Text style={textStyle}>1 Card</Text>
      );
  } else {
      return (
          <Text style={textStyle}>{`${questions} Cards`}</Text>
      );
  };    
};

export default class ViewDeck extends React.Component {
  state = {
    deleteDeck: false,
    quiz: false
  }
 
  render() {
    const { textStyle, mainContainer, btn, btnFocus, btnDanger, btnDelete } = styles;
    return (      
      <View style={[mainContainer]}>
        {this.props.navigation.state.params &&
          <View style={{alignItems: 'center'}}>
            <Text style={[textStyle, { fontSize: 60 }]}>{this.props.navigation.state.params.deckName}</Text>
            <CardsCount questions={this.props.navigation.state.params.questions} textStyle={textStyle}/>
            <View style={{ marginTop: 70 }}>
            <TouchableOpacity style={btn} onPress={() => 
                this.props.navigation.navigate('AddCard', {
                  deckName: this.props.navigation.state.params.deckName,
                  questions: this.props.navigation.state.params.questions,
                  deckId: this.props.navigation.state.params.deckId
            })}>
                <Text style={{ fontSize: 20, color: white }}>Add Card</Text>          
            </TouchableOpacity>

            {this.props.navigation.state.params.questions > 0 &&
            <TouchableOpacity style={btnFocus} onPress={() => 
                this.props.navigation.navigate('Quiz', {
                deckId: this.props.navigation.state.params.deckId
            })}>
                <Text style={{ fontSize: 20, color: white }}>Start Quiz</Text>          
            </TouchableOpacity>
            }
            {this.props.navigation.state.params.home &&
            <TouchableOpacity style={btnFocus} onPress={() => 
                this.props.navigation.navigate('Main')}>
                <Text style={{ fontSize: 20, color: white }}>Home</Text>          
            </TouchableOpacity>
            }

            {!this.state.deleteDeck ?
            <TouchableOpacity style={btnDelete} onPress={() => this.setState({ deleteDeck: true })}>
                <Text style={ Platform.OS === 'ios' ? { fontSize: 17, color: white } : { fontSize: 20, color: white } }>Delete Deck</Text>          
            </TouchableOpacity>
            :
            <TouchableOpacity style={btnDanger} onPress={() => {
              AsyncStorage.removeItem(this.props.navigation.state.params.deckId)
              this.props.navigation.navigate('Main', {update: true})
              }}>
              <Text style={ Platform.OS === 'ios' ? { fontSize: 17, color: white } : { fontSize: 20, color: white } }>Confirm</Text>          
            </TouchableOpacity>
            }
            </View>
          </View>
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
    color: white
  },
  btn: {
    borderRadius: 5,
    padding: 20,
    marginTop: 30,
    borderWidth: 1.5,
    borderColor: white,    
    alignItems: 'center'
  },
  btnDanger: {
    borderRadius: 5,
    padding: 5,
    marginTop: 90,
    backgroundColor: red,
    alignItems: 'center'
  },
  btnDelete: {
    borderRadius: 5,
    padding: 5,
    marginTop: 90,
    borderWidth: 1.5,
    borderColor: red,    
    alignItems: 'center'
  },
  btnFocus: {
    borderRadius: 5,
    padding: 20,
    marginTop: 30,    
    borderWidth: 1.5,
    borderColor: red,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
