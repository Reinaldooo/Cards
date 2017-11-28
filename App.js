import React from 'react';
import Main from './components/Main'
import ViewDeck from './components/ViewDeck'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { StatusBar, View } from 'react-native'
import { Constants } from 'expo'

const Tabs = TabNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      tabBarLabel: 'Decks'
    },
  },
  Deck: {
    screen: ViewDeck,
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
      backgroundColor: "#42A5F5",
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
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#42A5F5',
      }
    }
  }
})

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
 
  render() {
    return (
      <View style={{flex: 1}}>
      <UdaciStatusBar backgroundColor='#42A5F5' barStyle="default" />
      <MainNavigator/>
      </View>
    );
  }
}