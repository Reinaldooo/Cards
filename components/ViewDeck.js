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
          <View style={{flexBasis: "100%", alignItems: "center", flexDirection: 'column', justifyContent: 'space-around'}}>
            <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={[textStyle, { fontSize: 50 }]}>{this.props.navigation.state.params.deckName}</Text>
            <CardsCount questions={this.props.navigation.state.params.questions} textStyle={textStyle}/>
            </View>
            <View style={{ flex: 1.5, flexDirection: 'column', justifyContent: 'space-around' }}>
            <TouchableOpacity style={btn} onPress={() => 
                this.props.navigation.navigate('AddCard', {
                  deckName: this.props.navigation.state.params.deckName,
                  questions: this.props.navigation.state.params.questions,
                  deckId: this.props.navigation.state.params.deckId
            })}>
                <Text style={{ fontSize: 20, color: '#424242' }}>Add Card</Text>          
            </TouchableOpacity>

            {this.props.navigation.state.params.questions > 0 &&
            <TouchableOpacity style={btnFocus} onPress={() => 
                this.props.navigation.navigate('Quiz', {
                deckId: this.props.navigation.state.params.deckId
            })}>
                <Text style={{ fontSize: 20, color: '#424242' }}>Start Quiz</Text>          
            </TouchableOpacity>
            }
            {this.props.navigation.state.params.home &&
            <TouchableOpacity style={btnFocus} onPress={() => 
                this.props.navigation.navigate('Main', { home: true })}>
                <Text style={{ fontSize: 20, color: '#424242' }}>Home</Text>          
            </TouchableOpacity>
            }

            {!this.state.deleteDeck ?
            <TouchableOpacity style={btnDelete} onPress={() => this.setState({ deleteDeck: true })}>
                <Text style={{ fontSize: 17, color: '#424242' }}>Delete Deck</Text>          
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
    backgroundColor: '#FAFAFA',
    flexBasis: "100%",
    paddingTop: "10%"
  },
  textStyle: {
    fontSize: 20,
    color: '#424242'
  },
  btn: {
    borderRadius: 5,    
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderWidth: 1.5,
    borderColor: '#424242',    
    alignItems: 'center'
  },
  btnDanger: {
    borderRadius: 5,
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    backgroundColor: red,
    alignItems: 'center'
  },
  btnDelete: {
    borderRadius: 5,
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderWidth: 1.5,
    borderColor: red,    
    alignItems: 'center'
  },
  btnFocus: {
    borderRadius: 5,
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderWidth: 1.5,
    borderColor: red,
    alignItems: 'center'
  }
});
