
import { AsyncStorage } from 'react-native'
// import uuidv4 from 'uuid/v4'

export function createDecks () {
    
      AsyncStorage.setItem("1", JSON.stringify({
        title: 'React',
        questions: [
          {
            question: 'What is React?',
            answer: 'A library for managing user interfaces'
          },
          {
            question: 'Where do you make Ajax requests in React?',
            answer: 'The componentDidMount lifecycle event'
          }
        ],
        id: "1"
      }));

      AsyncStorage.setItem("2", JSON.stringify({
        title: 'JavaScript',
        questions: [
          {
            question: 'What is a closure?',
            answer: 'The combination of a function and the lexical environment within which that function was declared.'
          }
        ],
        id: "2"
      }));

      AsyncStorage.setItem("3", JSON.stringify({
        title: 'Native',
        questions: [],
        id: "3"
      }));

};