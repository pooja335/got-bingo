import * as firebase from "firebase/app"
import "firebase/database"

const firebaseConfig = {
  // apiKey: "AIzaSyD7LRHKgO38uvq3rhHY9AyWkOEK-HFCBdI",
  authDomain: "got-bingo.firebaseapp.com",
  databaseURL: "https://got-bingo.firebaseio.com",
  projectId: "got-bingo",
  storageBucket: "got-bingo.appspot.com",
  messagingSenderId: "470065775381"
}

firebase.initializeApp(firebaseConfig)

export const database = firebase.database()

