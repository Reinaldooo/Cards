import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'

export default class DeckContainer extends Component {
    test = () => {
        console.log(this.props)
    }
    
    
    render() {
        const { textStyle, viewStyle } = styles
        {console.log(this.props)}

        return (
            <TouchableOpacity style={viewStyle} onPress={() => this.props.navigation.navigate('ViewDeck')}>
                <Text style={[textStyle, {fontSize: 30}]}>{this.props.deckName}</Text>
                <Text style={textStyle}>{
                    this.props.questions === 0 ?
                    "No questions!"
                    :
                    this.props.questions + " - question(s)"
                }</Text>
            </TouchableOpacity>
        )
    } 
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 20,
        color: '#424242'
    },
    viewStyle: {
        backgroundColor: '#EEEEEE',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.5,
        elevation: 2,
        position: 'relative',
        marginTop: 20
    }
  });
