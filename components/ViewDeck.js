import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'


export default class ViewDeck extends React.Component {
 
  render() {
    const { container, textStyle, mainContainer, btn } = styles

    return (
      
      <View style={[mainContainer]}>
        {this.props.navigation.state.params &&
          <View style={{alignItems: 'center'}}>
            <Text style={[textStyle, {fontSize: 70}]}>{this.props.navigation.state.params.deckName}</Text>
            <Text style={textStyle}>{
              this.props.navigation.state.params.questions === 0 ?
                "No questions!"
                :
                `${this.props.navigation.state.params.questions} - question(s)`
            }
            </Text>

            <TouchableOpacity style={btn}>
                <Text style={{fontSize: 30}}>Add Card</Text>          
            </TouchableOpacity>
            <TouchableOpacity style={btn}>
                <Text style={{fontSize: 30}}>Start Quiz</Text>          
            </TouchableOpacity>

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
    fontSize: 50,
    color: '#424242'
  },
  btn: {
    backgroundColor: '#42A5F5',
    borderRadius: 20,
    padding: 20,
    marginTop: 30
  },
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
