import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import uuidv4 from 'uuid/v4';

export default class AddDeck extends React.Component {

  state = {
      deckName: ''
  }  

  textHandle = () => {
    const id = uuidv4()
    const newDeck = { 
        title: this.state.deckName,
        questions: [],
        id
      }
    AsyncStorage.setItem(id, JSON.stringify(newDeck));
    this.props.navigation.navigate('Main', {newDeck});
  }
 
  render() {
    const { inputStyle, mainContainer, btnBlue } = styles

    return (
      
      <View style={[mainContainer]}>
      <Text style={{ fontSize: 20 }}>Add your new deck:</Text>
        <TextInput
            value={this.state.deckName}
            style={inputStyle}
            placeholder='Deck Name'
            autoCorrect={false}
            onChangeText={deckName => this.setState({ deckName })}
        />
        <TouchableOpacity 
        style={btnBlue}
        onPress={this.textHandle}
        >
            <Text style={{ fontSize: 20 }}>Add Deck</Text>          
        </TouchableOpacity>
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
  inputStyle: {
    fontSize: 30,
    color: '#424242',
    height: 50,
    width: 250
  },
  btnBlue: {
    borderRadius: 5,
    padding: 20,
    marginTop: 30,    
    borderWidth: 1.5,
    borderColor: '#E53935',
  }
});
