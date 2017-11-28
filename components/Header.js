import React from 'react'
import { Text, StyleSheet, View } from 'react-native'

const Header = (props) => {
    const { textStyle, viewStyle } = styles
    return (
    <View style={viewStyle}>
        <Text style={textStyle}>{props.header}</Text>
    </View>
    ) 
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 20,
        color: 'white'
    },
    viewStyle: {
        backgroundColor: '#424242',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.5,
        elevation: 2,
        position: 'relative'
    }
  });

  export default Header;