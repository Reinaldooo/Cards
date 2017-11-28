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
    style: {
      height: 56,
      backgroundColor: "#333",
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
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
        backgroundColor: '#333',
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
      <UdaciStatusBar backgroundColor='#333333' barStyle="default" />
      <MainNavigator/>
      </View>
    );
  }
}