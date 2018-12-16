
import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'UdaciCards:notifications'
// import uuidv4 from 'uuid/v4'

export const createDecks = () => {
    
      AsyncStorage.setItem("4545554564-5156456", JSON.stringify({
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
        id: "4545554564-5156456",
        tried: "You did not practiced this deck today",
        key: "4545554564-5156456"
      }));

      AsyncStorage.setItem("2545154554546-568464", JSON.stringify({
        title: 'JavaScript',
        questions: [
          {
            question: 'What is a closure?',
            answer: 'The combination of a function and the lexical environment within which that function was declared.'
          }
        ],
        id: "2545154554546-568464",
        tried: "You did not practiced this deck today",
        key: "2545154554546-568464"
      }));

      AsyncStorage.setItem("54545654654-56556646", JSON.stringify({
        title: 'Native',
        questions: [],
        id: "54545654654-56556646",
        tried: "You did not practiced this deck today",
        key: "54545654654-56556646"
      }));     
};


export const clearLocalNotification = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

const createNotification = () => {
  return {
    title: 'Practice your skills on your decks!',
    body: "👋 don't forget to test your knowledge!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}