import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBiHmQft37_oWqbbPjRWBNSW5G-fIRDoNY",
    authDomain: "react-app-curso-3ed89.firebaseapp.com",
    projectId: "react-app-curso-3ed89",
    storageBucket: "react-app-curso-3ed89.appspot.com",
    messagingSenderId: "627038201068",
    appId: "1:627038201068:web:a6b3842a63407aec8bb1c9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()

  const googleAuthProvider= new firebase.auth.GoogleAuthProvider()

  export {
      db,googleAuthProvider,firebase
  }

