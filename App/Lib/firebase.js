import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBTEEba7fnEyNm6zK1s5Xp8XBb7W8Z8TgM",
    authDomain: "trim-healthy-tracker.firebaseapp.com",
    databaseURL: "https://trim-healthy-tracker.firebaseio.com",
    projectId: "trim-healthy-tracker",
    storageBucket: "trim-healthy-tracker.appspot.com",
    messagingSenderId: "150615919694"
};

export const firebaseApp = firebase.initializeApp(config);