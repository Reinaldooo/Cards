import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, AsyncStorage } from 'react-native';


export default class ViewDeck extends React.Component {
 
  render() {
    const { textStyle, mainContainer, btn, btnBlue, btnDanger } = styles

    return (
      
      <View style={[mainContainer]}>
        {this.props.navigation.state.params &&
          <View style={{alignItems: 'center'}}>
            <Text style={[textStyle, { fontSize: 60 }]}>{this.props.navigation.state.params.deckName}</Text>
            <Text style={textStyle}>{
              this.props.navigation.state.params.questions === 0 ?
                'No cards yet!'
                :
                `${this.props.navigation.state.params.questions} card(s)`
            }
            </Text>

            <View style={{ marginTop: 70 }}>
            <TouchableOpacity style={btn} onPress={() => 
                this.props.navigation.navigate('AddCard', {
                deckId: this.props.navigation.state.params.deckId
            })}>
                <Text style={{ fontSize: 20 }}>Add Card</Text>          
            </TouchableOpacity>
            <TouchableOpacity style={btnBlue}>
                <Text style={{ fontSize: 20 }}>Start Quiz</Text>          
            </TouchableOpacity>
            <TouchableOpacity style={btnDanger} onPress={() => {
                AsyncStorage.removeItem(this.props.navigation.state.params.deckId)
                this.props.navigation.navigate('Main', {update: true})
                }}>
                <Text style={{ fontSize: 20 }}>Delete Deck</Text>          
            </TouchableOpacity>
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
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50
  },
  textStyle: {
    fontSize: 30,
    color: '#424242'
  },
  btn: {
    borderRadius: 5,
    padding: 20,
    marginTop: 30,
    borderWidth: 1.5,
    borderColor: '#333',
  },
  btnDanger: {
    borderRadius: 5,
    padding: 20,
    marginTop: 30,
    backgroundColor: '#E53935'
  },
  btnBlue: {
    borderRadius: 5,
    padding: 20,
    marginTop: 30,    
    borderWidth: 1.5,
    borderColor: '#E53935',
  },
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
