import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { getStorage, ref } from "firebase/storage";

import 'firebase/compat/storage'


const firebaseConfig = {
    apiKey: "AIzaSyAQAWPF0VraSfoS7z32gyGbH7IzQUdeTlM",
    authDomain: "alarmapp-a3867.firebaseapp.com",
    projectId: "alarmapp-a3867",
    storageBucket: "alarmapp-a3867.appspot.com",
    messagingSenderId: "159825182420",
    appId: "1:159825182420:web:a1f3736b43c1222909c541"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export { firebase };