import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';

export default class AddCard extends React.Component {

  state = {
      question: '',
      answer: ''
  }  

  textHandle = () => {
    const newcard = { 
        question: this.state.question.trim(),
        answer: this.state.answer.trim()
      }
      AsyncStorage.getItem( this.props.navigation.state.params.deckId )
      .then( data => {
        data = JSON.parse( data );
        data.questions = data.questions.concat(newcard);
        AsyncStorage.setItem( this.props.navigation.state.params.deckId, JSON.stringify( data ) );
      })
    this.props.navigation.navigate('Main');
  }
 
  render() {
    const { inputStyle, mainContainer, btnBlue } = styles

    return (
      
      <View style={[mainContainer]}>
      <Text style={{ fontSize: 20 }}>Add your new card:</Text>
        <TextInput
            value={this.state.question}
            style={inputStyle}
            placeholder='Question'
            autoCorrect={false}
            onChangeText={question => this.setState({ question })}
        />
        <TextInput
            value={this.state.answer}
            style={inputStyle}
            placeholder='Answer'
            autoCorrect={false}
            onChangeText={answer => this.setState({ answer })}
        />
        <TouchableOpacity 
        style={btnBlue}
        onPress={this.textHandle}
        >
            <Text style={{ fontSize: 20 }}>Add Card</Text>          
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
