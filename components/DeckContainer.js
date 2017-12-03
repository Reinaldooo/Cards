import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class DeckContainer extends Component {

    render() {
        const { textStyle, viewStyle } = styles;

        return (
            <TouchableOpacity style={viewStyle} onPress={() => 
                this.props.navigation.navigate('ViewDeck', {
                deckName: this.props.deckName,
                questions: this.props.questions,
                deckId: this.props.deckId
            })}>
                <Text style={[textStyle, {fontSize: 30}]}>{this.props.deckName}</Text>
                <Text style={textStyle}>{
                    this.props.questions === 0 ?
                    "No cards yet!"
                    :
                    `${this.props.questions} card(s)`
                }</Text>
                <Ionicons name="md-albums" size={25} style={{ color: '#333', paddingTop: 5 }} />
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#E53935',
        margin: 20
    }
  });
