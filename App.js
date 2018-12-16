import React from 'react';
import { StatusBar, View, Platform, AsyncStorage } from 'react-native';
import { Constants } from 'expo';
import { createDecks } from './utils/helper';
import { MainNavigator } from './utils/navigate';


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
      <UdaciStatusBar backgroundColor={Platform.OS === 'ios' ? 'white' : 'tomato'} barStyle="default" />
      <MainNavigator />
      </View>
    );
  }
}
