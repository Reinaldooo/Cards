import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
/*

Specific Requirements

    Use create-react-native-app to build your project.
    Allow users to create a deck which can hold an unlimited number of cards.
    Allow users to add a card to a specific deck.
    The front of the card should display the question.
    The back of the card should display the answer.
    Users should be able to quiz themselves on a specific deck and receive a score once they're done.
    Users should receive a notification to remind themselves to study if they haven't already for that day.



TODO:


    Deck List View (Default View)
        displays the title of each Deck
        displays the number of cards in each deck
*/

export default class App extends React.Component {
  render() {
    const { container, text } = styles
    return (
      <View style={container}>
        <Text style={text}>Testando Native!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 55, 
  }
});
