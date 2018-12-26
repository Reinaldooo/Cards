
import { AsyncStorage } from 'react-native';
import sortBy from 'sort-by';
import { Notifications, Permissions } from 'expo'
import uuid from 'uuid';

const NOTIFICATION_KEY = 'UdaciCards:notifications'
// import uuidv4 from 'uuid/v4'

export const parseDecks = (decks) => {
  return decks
    //remove notifications and reminders
    .filter((deck) => deck[0] !== "UdaciCards:notifications" && deck[0] !== "reminderSet" && deck !== null)
    .map(deck => JSON.parse(deck[1]))
    .sort(sortBy('title'))
}

export const createDecks = async () => {
      let id1 = String(Date.now() + 50)
      let id2 = String(Date.now() + 150)
      let id3 = String(Date.now() + 250)
      let id4 = String(Date.now() + 350)
      let id5 = String(Date.now() + 450) 
      await AsyncStorage.setItem(id1, JSON.stringify({
        title: 'React',
        questions: [
          {
            question: 'What is React?',
            answer: 'A library for managing user interfaces'
          },
          {
            question: 'Where do you make Ajax requests in React?',
            answer: 'The componentD1Mount lifecycle event'
          }
        ],
        id: id1,
        tried: "Not practiced today!",
        key: id1
      }));      
      await AsyncStorage.setItem(id2, JSON.stringify({
        title: 'JavaScript',
        questions: [
          {
            question: 'What is a closure?',
            answer: 'The combination of a function and the lexical environment within which that function was declared.'
          }
        ],
        id: id2,
        tried: "Not practiced today!",
        key: id2
      }));      
      await AsyncStorage.setItem(id3, JSON.stringify({
        title: 'Native',
        questions: [
          {
            question: 'Can React-Native work on IOS and Android?',
            answer: 'Yes.'
          }
        ],
        id: id3,
        tried: "Not practiced today!",
        key: id3
      }));     
      await AsyncStorage.setItem(id4, JSON.stringify({
        title: 'TypeScript',
        questions: [],
        id: id4,
        tried: "Not practiced today!",
        key: id4
      }));       
      await AsyncStorage.setItem(id5, JSON.stringify({
        title: 'GraphQL',
        questions: [],
        id: id5,
        tried: "Not practiced today!",
        key: id5
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