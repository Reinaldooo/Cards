import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { StatusBar, View, Platform, AsyncStorage } from 'react-native';
import { Constants } from 'expo';
import Main from './components/Main';
import ViewDeck from './components/ViewDeck';
import AddDeck from './components/AddDeck';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import { createDecks } from './utils/helpers';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const Tabs = TabNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name="md-albums" size={30} color={tintColor} />
    },
  },
  Deck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  }

}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? '#E53935' : 'white',
    labelStyle: {
      fontSize: Platform.OS === 'ios' ? 12 : 18,
    },
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? 'white' : '#E53935',
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
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      title: 'Quiz',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#E53935',
      }
    }),
  }
});

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default class App extends React.Component {

  componentDidMount() {
    AsyncStorage.clear();
    createDecks();
  }
 
  render() {    
    return (
      <View style={{ flex: 1 }}>
      <UdaciStatusBar backgroundColor={Platform.OS === 'ios' ? 'white' : '#E53935'} barStyle="default" />
      <MainNavigator />
      </View>
    );
  }
}
