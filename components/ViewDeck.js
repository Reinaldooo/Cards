import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';


export default class ViewDeck extends React.Component {
 
  render() {
    const { textStyle, mainContainer, btn, btnBlue } = styles

    return (
      
      <View style={[mainContainer]}>
        {this.props.navigation.state.params &&
          <View style={{alignItems: 'center'}}>
            <Text style={[textStyle, { fontSize: 60 }]}>{this.props.navigation.state.params.deckName}</Text>
            <Text style={textStyle}>{
              this.props.navigation.state.params.questions === 0 ?
                'No cards yet!'
                :
                `${this.props.navigation.state.params.questions} - card(s)`
            }
            </Text>

            <View style={{ marginTop: 70 }}>
            <TouchableOpacity style={btn}>
                <Text style={{ fontSize: 20 }}>Add Card</Text>          
            </TouchableOpacity>
            <TouchableOpacity style={btnBlue}>
                <Text style={{ fontSize: 20 }}>Start Quiz</Text>          
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
