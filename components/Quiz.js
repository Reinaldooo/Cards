import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, AsyncStorage, Platform } from 'react-native';
import CardFlip from 'react-native-card-flip';
import { Ionicons } from '@expo/vector-icons';
import { clearLocalNotification, setLocalNotification } from '../utils/helper';
import { blue, white } from '../utils/colorNames';

const CardsCount = ({ questions, textStyle }) => {
  if (questions === 1) {
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
        restartHelper: JSON.parse(result).questions.length - 1
      })
    });
    AsyncStorage.getItem("reminderSet", (err, result) => {
      if (result == "yes") {
        this.setState({ remind: false })
      } else {
        this.setState({ remind: true })
      }
    });
  }

  isLast = () => {
    const check = this.state.currentQuestion + 1;
    const last = this.state.lastQuestion;

    if (check > last) {
      return true
    } else {
      return false
    }
  }

  correct = (card) => {
    if(this.isLast()) {
      this.setState(prev => ({
        question: true,
        quizEnded: true,
        score: prev.score + 1
      }))
    } else {
      card.flip();
      setTimeout(() => {
        this.setState(prev => ({
          question: true,
          quizEnded: false,
          currentQuestion: prev.currentQuestion + 1,
          score: prev.score + 1
        }))        
      }, 200);
    }
  }

  incorrect = (card) => {
    if(this.isLast()) {
      this.setState({
        question: true,
        quizEnded: true
      })
    } else {
      card.flip();
      setTimeout(() => {
        this.setState(prev => ({
          question: true,
          quizEnded: false,
          currentQuestion: prev.currentQuestion + 1
        }))        
      }, 200);
    }
  }

  endQuizWithNotification = (percentage) => {
    AsyncStorage.getItem(this.props.navigation.state.params.deckId)
      .then(data => {
        data = JSON.parse(data);
        if (percentage === 0) {
          data.tried = `You didn't score in this test!`;
        } else {
          data.tried = `You got a score of ${percentage}%`;
        }
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
        if (percentage === 0) {
          data.tried = `You didn't score in this test!`;
        } else {
          data.tried = `You got a score of ${percentage}%`;
        }
        AsyncStorage.setItem(this.props.navigation.state.params.deckId, JSON.stringify(data));
      });
    AsyncStorage.setItem("reminderSet", 'no');
    this.setState({ remind: undefined })
  }
  endQuiz = (percentage) => {
    AsyncStorage.getItem(this.props.navigation.state.params.deckId)
      .then(data => {
        data = JSON.parse(data);
        if (percentage === 0) {
          data.tried = `You didn't score in this test!`;
        } else {
          data.tried = `You got a score of ${percentage}%`;
        }
        AsyncStorage.setItem(this.props.navigation.state.params.deckId, JSON.stringify(data));
      });
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
    const { textStyle, mainContainer, btn, questionCard, question, answer } = styles;
    const questions = this.state.lastQuestion + 1;
    const percentage = this.state.score / questions;

    return (
      <View style={[mainContainer]}>
        {
          this.state.deck.title && this.state.quizEnded === false ?
            <CardFlip style={questionCard} ref={(card) => this.card = card} >              
              <View style={ question }>
                <Text style={[textStyle, { marginTop: 20, color: blue }]}>{`Question ${this.state.currentQuestion + 1} of ${this.state.lastQuestion + 1}`}</Text>
                <Text style={[textStyle, { fontSize: 30, marginTop: 50, textAlign: 'center', color: blue }]}>{this.state.deck.questions[this.state.currentQuestion].question}</Text>
                <TouchableOpacity
                  style={[btn, { marginTop: 60 }]}
                  onPress={() => {
                    this.card.flip();
                    this.setState({ question: false })
                    }
                  }>
                  <Text style={{ fontSize: 20, color: blue }}>Flip</Text>
                </TouchableOpacity>
              </View>
              <View style={ answer }> 
                <Text style={[textStyle, { fontSize: 30 }]}>{this.state.deck.title}</Text>
                <Text style={textStyle}>{`Question ${this.state.currentQuestion + 1} of ${this.state.lastQuestion + 1}`}</Text>
                <View style={{ alignItems: 'center' }}>
                  <Text style={[textStyle, { fontSize: 20, marginTop: 50, padding: 15, textAlign: 'center', color: white }]}>{this.state.deck.questions[this.state.currentQuestion].answer}</Text>
                  <View style={{ alignItems: 'center', marginTop: 60, flexDirection: 'row' }}>
                    <TouchableOpacity
                      style={[btn, { borderColor: white, flex: 1, marginLeft: 20, marginRight: 5 }]}
                      onPress={() => this.correct(this.card)}>
                      <Text style={{ fontSize: 20, color: white }}><Ionicons name={Platform.OS === 'ios' ? "ios-thumbs-up" : "md-thumbs-up"} size={30} color={white} /></Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[btn, { borderColor: white, flex: 1, marginRight: 20, marginLeft: 5 }]}
                      onPress={() => this.incorrect(this.card) }>
                      <Text style={{ fontSize: 20, color: white }}><Ionicons name={Platform.OS === 'ios' ? "ios-thumbs-down" : "md-thumbs-down"} size={30} color={white} /></Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
          </CardFlip>
          :
            <View style={{ alignItems: 'center' }}>
              <Text style={[textStyle, { fontSize: 25, marginTop: 30, padding: 15, textAlign: 'center', color: blue }]}>
                {percentage > 0.74 ?
                  `You got a score of ${Math.floor(percentage * 100)}%! Congratulations!`
                  :
                  `You got a score of ${Math.floor(percentage * 100)}%! Study more and try again!`
                }
              </Text>
              {this.state.remind ?
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                  <Text style={[textStyle, { fontSize: 20, marginTop: 30, padding: 15, textAlign: 'center', color: 'gray' }]}>Would you like to get daily reminders?</Text>
                  <TouchableOpacity
                    style={[btn, { borderColor: '#424242', marginTop: 8 }]}
                    onPress={() => this.endQuizWithNotification(Math.floor(percentage * 100))}>
                    <Text style={{ fontSize: 20, color: '#424242' }}>Yep!</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[btn, { borderColor: '#424242', marginTop: 8 }]}
                    onPress={() => this.endQuizWithoutNotification(Math.floor(percentage * 100))}>
                    <Text style={{ fontSize: 20, color: '#424242' }}>Nope!</Text>
                  </TouchableOpacity>
                </View>
                :
                <View style={{ marginTop: 60 }}>

                  <TouchableOpacity
                    style={[btn, { borderColor: '#424242', marginTop: 8 }]}
                    onPress={() => this.endQuiz(Math.floor(percentage * 100))}>
                    <Text style={{ fontSize: 20, color: '#424242' }}>End Quiz</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[btn, { borderColor: blue, marginTop: 8 }]}
                    onPress={() => this.setState({
                      currentQuestion: 0,
                      lastQuestion: this.state.restartHelper,
                      quizEnded: false,
                      score: 0,
                      question: true
                    })}>
                    <Text style={{ fontSize: 20, color: '#424242' }}>Restart Quiz</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[btn, { borderColor: '#424242', marginTop: 8 }]}
                    onPress={() => this.backToDeck(Math.floor(percentage * 100))}>
                    <Text style={{ fontSize: 20, color: '#424242' }}>Back to Deck</Text>
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
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: "10%"
  },
  textStyle: {
    fontSize: 20,
    color: white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderColor: blue,
    alignItems: 'center'
  },
  btnDanger: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 60,
    backgroundColor: blue,
    alignItems: 'center'
  },
  btnDelete: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 60,
    borderWidth: 1.5,
    borderColor: blue,
    alignItems: 'center'
  },
  btnFocus: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    borderWidth: 1.5,
    borderColor: blue,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    width: '90%',
    height: '70%',
  },
  question: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: '#E3F2FD',
    borderWidth: 2,
    backgroundColor: white,
  },
  answer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    paddingHorizontal: 10,
    backgroundColor: blue,
    borderRadius: 5,
  },
});
