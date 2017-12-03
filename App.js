import React from 'react';
import Main from './components/Main';
import ViewDeck from './components/ViewDeck';
import AddDeck from './components/AddDeck';
import AddCard from './components/AddCard';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { StatusBar, View, AsyncStorage } from 'react-native';
import { Constants } from 'expo';
import { createDecks } from './utils/API';

const Tabs = TabNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      tabBarLabel: 'Decks'
    },
  },
  Deck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck'
    },
  }

}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: 'white',
    labelStyle: {
      fontSize: 18,
    },
    style: {
      height: 56,
      backgroundColor: "#E53935",
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    },
    indicatorStyle: {
      backgroundColor: '#fff',
      height: 2.5
    }
  }
});

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  ViewDeck: {
    screen: ViewDeck,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.deckName} Deck`,
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#E53935',
      }
    }),
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: ({ navigation }) => ({
      title: 'Add Card',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#E53935',
      }
    }),
  }
})

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {

  componentDidMount() {
    createDecks();
  }
 
  render() {
    return (
      <View style={{ flex: 1 }}>
      <UdaciStatusBar backgroundColor='#E53935' barStyle="default" />
      <MainNavigator />
      </View>
    );
  }
}