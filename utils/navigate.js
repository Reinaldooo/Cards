import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import Main from '../components/Main';
import ViewDeck from '../components/ViewDeck';
import AddDeck from '../components/AddDeck';
import AddCard from '../components/AddCard';
import Quiz from '../components/Quiz';
import { Platform } from 'react-native';
import { red, white } from './colorNames';

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
      activeTintColor: '#F4511E',
      inactiveTintColor: '#FF8A65',
      labelStyle: {
        fontSize: Platform.OS === 'ios' ? 12 : 18,
      },
      style: {
        height: 56,
        backgroundColor: white,
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
  
  export const MainNavigator = StackNavigator({
    Home: {
      screen: Tabs
    },
    ViewDeck: {
      screen: ViewDeck,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.deckName} Deck`,
        headerTintColor: white,
        headerStyle: {
          backgroundColor: red,
          marginTop: 0 - Constants.statusBarHeight
        }
      }),
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: ({ navigation }) => ({
        title: 'Add Card',
        headerTintColor: white,
        headerStyle: {
          backgroundColor: red,
          marginTop: 0 - Constants.statusBarHeight
        }
      }),
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: ({ navigation }) => ({
        title: 'Quiz',
        headerTintColor: white,
        headerStyle: {
          backgroundColor: red,
          marginTop: 0 - Constants.statusBarHeight
        }
      }),
    }
  });