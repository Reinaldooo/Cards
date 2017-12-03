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
      };

    AsyncStorage.getItem(this.props.navigation.state.params.deckId)
      .then(data => {
            data = JSON.parse(data);
            data.questions = data.questions.concat(newcard);
            AsyncStorage.setItem(this.props.navigation.state.params.deckId, JSON.stringify(data));
    });

    this.props.navigation.navigate('Main');
  }
 
  render() {
    const { inputStyle, mainContainer, btnFocus } = styles;
    return (      
      <View style={[mainContainer]}>
      <Text style={{ fontSize: 30, marginBottom: 15, color: 'white' }}>Add your new card:</Text>
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
    color: '#424242',
    height: 60,
    width: 300
  },
  btnFocus: {
    borderRadius: 5,
    padding: 20,
    marginTop: 30,    
    borderWidth: 1.5,
    borderColor: '#E53935',
  }
});
