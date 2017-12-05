import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import { red, white } from '../utils/colors';

const CardsCount = ({ questions, textStyle }) => {
  if(questions === 1) {
      return (
          <Text style={textStyle}>1 Question</Text>
      );
  } else {
      return (
          <Text style={textStyle}>{`${questions} Questions`}</Text>
      );
  };    
};

export default class Quiz extends React.Component {
  state = {
    deck: {},
    currentQuestion: 0,
    lastQuestion: null,
    quizEnded: false,
    score: 0,
    question: true,
    remind: undefined,
    restartHelper: null
  }

  componentDidMount() {
    AsyncStorage.getItem(this.props.navigation.state.params.deckId, (err, result) => {
      this.setState({ 
        deck: JSON.parse(result), 
        lastQuestion: JSON.parse(result).questions.length - 1,
        restartHelper: JSON.parse(result).questions.length - 1 })
    });    
    AsyncStorage.getItem("reminderSet", (err, result) => {
      if(result == "yes"){
        this.setState({ remind: false })
      } else {
        this.setState({ remind: true })  
      }
    });
  }

  correct = () => {
    const check = this.state.currentQuestion + 1;
    const last = this.state.lastQuestion;

    this.setState((prevstate, props) => {
      if(check > last) {
        return {        
          question: true,
          quizEnded: true,
          score: prevstate.score + 1
        }  
      } else {
        return {        
          question: true,
          quizEnded: false,
          currentQuestion: prevstate.currentQuestion + 1,
          score: prevstate.score + 1
        }
      }         
    });
  }

  incorrect = () => {
    const check = this.state.currentQuestion + 1;
    const last = this.state.lastQuestion;

    this.setState((prevstate, props) => {
      if (check > last) {
        return {        
          question: true,
          quizEnded: true
        }  
      } else {
        return {        
          question: true,
          quizEnded: false,
          currentQuestion: prevstate.currentQuestion + 1
        }
      }         
    });
  }

  endQuizWithNotification = (percentage) => {
    AsyncStorage.getItem(this.props.navigation.state.params.deckId)
    .then(data => {
          data = JSON.parse(data);
          data.tried = `You got a score of ${percentage}%`;
          AsyncStorage.setItem(this.props.navigation.state.params.deckId, JSON.stringify(data));
    });
    AsyncStorage.setItem("reminderSet", 'yes');
    clearLocalNotification().then(setLocalNotification);
    this.setState({ remind: undefined })
  }
  endQuizWithoutNotification = (percentage) => {
    AsyncStorage.getItem(this.props.navigation.state.params.deckId)
    .then(data => {
          data = JSON.parse(data);
          data.tried = `You got a score of ${percentage}%`;
          AsyncStorage.setItem(this.props.navigation.state.params.deckId, JSON.stringify(data));
    });
    AsyncStorage.setItem("reminderSet", 'yes');
    this.setState({ remind: undefined })
  }
  endQuiz = (percentage) => {
    AsyncStorage.getItem(this.props.navigation.state.params.deckId)
    .then(data => {
          data = JSON.parse(data);
          data.tried = `You got a score of ${percentage}%`;
          AsyncStorage.setItem(this.props.navigation.state.params.deckId, JSON.stringify(data));
    });
    AsyncStorage.setItem("reminderSet", 'yes');
    this.props.navigation.navigate('Main', {
      updated: true
    })
  }
  backToDeck = (percentage) => {
    AsyncStorage.getItem(this.props.navigation.state.params.deckId)
    .then(data => {
          data = JSON.parse(data);
          data.tried = `You got a score of ${percentage}%`;
          AsyncStorage.setItem(this.props.navigation.state.params.deckId, JSON.stringify(data));
    });
    this.props.navigation.navigate('ViewDeck', {
      deckName: this.state.deck.title,
      questions: this.state.deck.questions.length,
      deckId: this.state.deck.id
    })
  }
   
  render() {
    const { textStyle, mainContainer, btn } = styles;
    const questions = this.state.lastQuestion + 1;
    const percentage = this.state.score / questions;

    return (      
      <View style={[mainContainer]}>
        {this.state.deck.title && this.state.quizEnded === false ?
          <View style={{alignItems: 'center' }}>
            <Text style={[textStyle, { fontSize: 30 }]}>{this.state.deck.title}</Text>
            <Text style={textStyle}>{`Question ${this.state.currentQuestion + 1} of ${this.state.lastQuestion + 1}`}</Text>
            {this.state.question ?
            <View style={{alignItems: 'center' }}>
            <Text style={[textStyle, { fontSize: 30, marginTop: 50, textAlign: 'center' }]}>{this.state.deck.questions[this.state.currentQuestion].question}</Text>
            <TouchableOpacity
            style={[btn, { marginTop: 60 }]}
            onPress={() => this.setState({ question: false })}>
                <Text style={{ fontSize: 20, color: white }}>Answer</Text>          
            </TouchableOpacity>
            </View>
            :
            <View style={{alignItems: 'center' }}>
            <Text style={[textStyle, { fontSize: 20, marginTop: 50, padding: 15, textAlign: 'center', color: 'gray' }]}>{this.state.deck.questions[this.state.currentQuestion].answer}</Text>
            <View style={{alignItems: 'center', marginTop: 60, flexDirection: 'row' }}>
            <TouchableOpacity
            style={[btn, { borderColor: white, flex: 1, marginLeft: 20, marginRight: 5 }]}
            onPress={this.correct}>
                <Text style={{ fontSize: 20, color: white }}>Correct</Text>          
            </TouchableOpacity>
            <TouchableOpacity
            style={[btn, { borderColor: 'red', flex: 1, marginRight: 20, marginLeft: 5 }]}
            onPress={this.incorrect}>
                <Text style={{ fontSize: 20, color: white }}>Incorrect</Text>          
            </TouchableOpacity>
            </View>
            </View>
            }
          </View>
          :
          <View style={{alignItems: 'center' }}>
          <Text style={[textStyle, { fontSize: 25, marginTop: 30, padding: 15, textAlign: 'center' }]}>
          {percentage > 0.74 ?
          `You got a score of ${Math.floor(percentage * 100)}%!
Congratulations!`
          :
          `You got a score of ${Math.floor(percentage * 100)}%!
Study more and try again!`  
          }
          </Text>
          {this.state.remind ?
          <View>
          <Text style={[textStyle, { fontSize: 20, marginTop: 30, padding: 15, textAlign: 'center', color: 'gray' }]}>Would you like to get daily reminders?</Text>
          <TouchableOpacity 
            style={[btn, { borderColor: white, marginTop: 8 }]}
            onPress={() => this.endQuizWithNotification(Math.floor(percentage * 100))}>
                <Text style={{ fontSize: 20, color: white}}>Yep!</Text>          
          </TouchableOpacity>
          <TouchableOpacity
          style={[btn, { borderColor: white, marginTop: 8 }]}
          onPress={() => this.endQuizWithoutNotification(Math.floor(percentage * 100))}>
                <Text style={{ fontSize: 20, color: white}}>Nope!</Text>          
          </TouchableOpacity>
          </View>
          :
          <View style={{ marginTop: 60 }}>
          
          <TouchableOpacity 
            style={[btn, { borderColor: white, marginTop: 8 }]}
            onPress={() => this.endQuiz(Math.floor(percentage * 100))}>
                <Text style={{ fontSize: 20, color: white}}>End Quiz</Text>          
          </TouchableOpacity>

          <TouchableOpacity 
            style={[btn, { borderColor: red, marginTop: 8 }]}
            onPress={() => this.setState({ 
              currentQuestion: 0,
              lastQuestion: this.state.restartHelper,
              quizEnded: false,
              score: 0,
              question: true
             })}>
                <Text style={{ fontSize: 20, color: white}}>Restart Quiz</Text>          
          </TouchableOpacity>

          <TouchableOpacity 
            style={[btn, { borderColor: white, marginTop: 8 }]}
            onPress={() => this.backToDeck(Math.floor(percentage * 100))}>
                <Text style={{ fontSize: 20, color: white}}>Back to Deck</Text>          
          </TouchableOpacity>

          </View>
          }
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30
  },
  textStyle: {
    fontSize: 20,
    color: white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    borderRadius: 5,
    padding: 10,
    borderWidth: 1.5,
    borderColor: white,    
    alignItems: 'center'
  },
  btnDanger: {
    borderRadius: 5,
    padding: 5,
    marginTop: 60,
    backgroundColor: red,
    alignItems: 'center'
  },
  btnDelete: {
    borderRadius: 5,
    padding: 5,
    marginTop: 60,
    borderWidth: 1.5,
    borderColor: red,    
    alignItems: 'center'
  },
  btnFocus: {
    borderRadius: 5,
    padding: 20,
    marginTop: 20,    
    borderWidth: 1.5,
    borderColor: red,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
