import React from 'react';
import { StatusBar, View, AsyncStorage, Platform } from 'react-native';
import { Constants } from 'expo';
import { parseDecks, createDecks } from '@utils/helper'
import { blue, white } from '@utils/colorNames'
import { MainNavigator } from '@utils/navigate';


function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default class App extends React.Component {

  state = {
    decks: []
  }

  componentDidMount() {     
    AsyncStorage.clear().then(() => {
      createDecks().then(() => {
        AsyncStorage.getAllKeys((err, keys) => {
          AsyncStorage.multiGet(keys, (err, decks) => {
            this.setState({ decks: parseDecks(decks) });
          });
        }).catch((e) => console.log(e));
      })
    });
  }

  render() {    
    return (
      <View style={{ flex: 1 }}>
      <UdaciStatusBar backgroundColor={Platform.OS === 'ios' ? white : blue} barStyle="default" />
      <MainNavigator screenProps={this.state}/>
      </View>
    );
  }
}
