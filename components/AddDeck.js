import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import uuidv4 from 'uuid/v4';

export default class AddDeck extends React.Component {

  state = {
      deckName: ''
  }  

  textHandle = () => {
    if(this.state.deckName === '') {
      alert('Please include a deck name.')
    } else {
      const id = uuidv4()
      const newDeck = { 
          title: this.state.deckName,
          questions: [],
          id,
          tried: "You did not practiced this deck today"
        }
      AsyncStorage.setItem(id, JSON.stringify(newDeck));

      this.setState({ deckName: ''});

      this.props.navigation.navigate('ViewDeck', {
        deckName: newDeck.title,
        questions: newDeck.questions.length,
        deckId: id,
        home: true
      });
    }     
  }
 
  render() {
    const { inputStyle, mainContainer, btnFocus } = styles;

    return (
      
      <View style={[mainContainer]}>
      <Text style={{ fontSize: 30, marginBottom: 15, color: 'white' }}>Add your new deck:</Text>
        <TextInput
            value={this.state.deckName}
            style={inputStyle}
            placeholder='Deck Name'
            onChangeText={deckName => this.setState({ deckName })}
            placeholderTextColor='#616161'
            underlineColorAndroid='transparent'
            autoCapitalize='sentences'
        />
        <TouchableOpacity 
        style={btnFocus}
        onPress={this.textHandle}
        >
            <Text style={{ fontSize: 20, color: 'white' }}>Add</Text>          
        </TouchableOpacity>
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
  inputStyle: {
    fontSize: 30,
    color: '#9E9E9E',
    height: 60,
    width: 300,    
    borderWidth: 0.5,
    borderColor: '#424242',
    borderRadius: 5,
    paddingLeft: 15,
    margin: 10
  },
  btnFocus: {
    borderRadius: 5,
    padding: 20,
    marginTop: 30,    
    borderWidth: 1.5,
    borderColor: '#E53935',
  }
});
