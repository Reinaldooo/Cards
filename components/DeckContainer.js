import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { white, blue } from '../utils/colorNames'

const CardsCount = ({ questions, textStyle }) => {
    if(questions === 0) {
        return (
            <Text style={textStyle}>No cards yet!</Text>
        );
    } else if(questions === 1) {
        return (
            <Text style={textStyle}>1 Card</Text>
        );
    } else {
        return (
            <Text style={textStyle}>{`${questions} Cards`}</Text>
        );
    };    
};

export default class DeckContainer extends Component {

    render() {
        const { textStyle, viewStyle, tried } = styles;
        return (
            <TouchableOpacity
                disabled={this.props.nolink ? true : false} 
                style={this.props.tried === "Not practiced today!" ? viewStyle : [viewStyle, tried]}
                onPress={() => 
                    this.props.navigation.navigate('ViewDeck', {
                    deckName: this.props.deckName,
                    questions: this.props.questions,
                    deckId: this.props.deckId
                })}>
                <Text style={[textStyle, { fontSize: 25 }]}>{this.props.deckName}</Text>
                <CardsCount questions={this.props.questions} textStyle={textStyle}/>
                <Ionicons name="md-albums" size={25} style={{ color: white, paddingTop: 5 }} />
                {this.props.tried && <Text style={[textStyle, { fontSize: 10, marginTop: 5 }]}>{this.props.tried}</Text>}
            </TouchableOpacity>
        )
    } 
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15,
        color: white
    },
    viewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
        backgroundColor: blue,
        shadowColor: "#757575",
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: .2,
        shadowRadius: 5,        
        elevation: 6,
        width: '47%'
    },
    tried: {
        borderTopWidth: 10,
        borderColor: '#81D4FA',
    }
  });
