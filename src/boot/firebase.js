import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.WEB_API_KEY,
    authDomain: process.env.PRJT_ID+".firebaseapp.com",
    databaseURL: process.env.DB_URL,
    projectId: process.env.PRJT_ID,
    storageBucket: process.env.PRJT_ID+".appspot.com",
    messagingSenderId: process.env.MSG_ID,
    appId: process.env.APP_ID,
};

let fb = firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

export {db,fb};