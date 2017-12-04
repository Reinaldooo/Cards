import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
        const { textStyle, viewStyle } = styles;
        return (
            <TouchableOpacity 
                style={this.props.tried === "You did not practiced this deck today" ? viewStyle : [viewStyle, { borderColor: '#E53935' }]}
                onPress={() => 
                    this.props.navigation.navigate('ViewDeck', {
                    deckName: this.props.deckName,
                    questions: this.props.questions,
                    deckId: this.props.deckId
                })}>
                <Text style={[textStyle, { fontSize: 30 }]}>{this.props.deckName}</Text>
                <CardsCount questions={this.props.questions} textStyle={textStyle}/>
                <Ionicons name="md-albums" size={25} style={{ color: 'white', paddingTop: 5 }} />
                {this.props.tried && <Text style={[textStyle, { fontSize: 10, marginTop: 5 }]}>{this.props.tried}</Text>}
            </TouchableOpacity>
        )
    } 
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 20,
        color: 'white'
    },
    viewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
        marginTop: 15,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 15,
    }
  });
