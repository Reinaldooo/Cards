import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import uuid from 'uuid';

export default class AddDeck extends React.Component {

  state = {
      deckName: ''
  }  

  textHandle = () => {
    if(this.state.deckName === '') {
      alert('Please include a deck name.')
    } else {
      const id = uuid()
      const newDeck = { 
          id,
          title: this.state.deckName,
          questions: [],
          tried: "You did not practiced this deck today",
          key: id
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
      {console.log(this.props)}
      <Text style={{ fontSize: 25, marginBottom: 15, color: '#424242' }}>Add your new deck:</Text>
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
            <Text style={{ fontSize: 20, color: '#424242' }}>Add</Text>          
        </TouchableOpacity>
        <TouchableOpacity 
        style={btnFocus}
        onPress={this.props.screenProps.test}
        >
            <Text style={{ fontSize: 20, color: '#424242' }}>Add</Text>          
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: "10%"
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
    paddingVertical: 10, 
    paddingHorizontal: 20,  
    borderWidth: 1.5,
    borderColor: 'tomato',
    marginTop: 15
  }
});
