import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import { blue } from '@utils/colorNames'

export default class AddCard extends React.Component {

  state = {
      question: '',
      answer: ''
  }  

  textHandle = () => {
    if(this.state.question === '' || this.state.answer === '') {
    alert('Please fill both fields.')
    } else {
      const deck = this.props.navigation.state.params
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
      this.setState({
          question: '',
          answer: ''
      });
      this.props.navigation.navigate('ViewDeck', {
        deckName: deck.deckName,
        questions: deck.questions + 1,
        deckId: deck.deckId,
        home: true
      });
    }
}


 
  render() {
    const { inputStyle, mainContainer, btnFocus } = styles;
    return (      
      <View style={[mainContainer]}>
      <Text style={{ fontSize: 30, marginBottom: 15, color: blue }}>Add your new card:</Text>
        <TextInput
            value={this.state.question}
            style={inputStyle}
            placeholder='Question'
            onChangeText={question => this.setState({ question })}
            placeholderTextColor='#616161'
            underlineColorAndroid='transparent'
            autoCapitalize='sentences'
        />
        <TextInput
            value={this.state.answer}
            style={inputStyle}
            placeholder='Answer'
            onChangeText={answer => this.setState({ answer })}
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
    borderColor: blue,
    marginTop: 15
  }
});
