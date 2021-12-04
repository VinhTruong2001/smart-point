import firebase from "firebase";
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDJ0UP8lO-mydEyIdBOeZE0twHWYEGL6Xs",
    authDomain: "smart-points-e07dd.firebaseapp.com",
    projectId: "smart-points-e07dd",
    storageBucket: "smart-points-e07dd.appspot.com",
    messagingSenderId: "510960398484",
    appId: "1:510960398484:web:eb806703fb37910cd14481"
  };

// eslint-disable-next-line
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };