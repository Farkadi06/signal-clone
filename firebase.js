import firebase from "firebase";
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyBIwkmjr-UYONlFqKpHC7qM7LH_VBgf6SA",
    authDomain: "signal-clone-53a52.firebaseapp.com",
    projectId: "signal-clone-53a52",
    storageBucket: "signal-clone-53a52.appspot.com",
    messagingSenderId: "25866927314",
    appId: "1:25866927314:web:8ad22aa0e8789975d6010b"
  };

let app;

if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}
else{
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export {auth, db, firebase}

