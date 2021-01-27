import firebase from "firebase/app";
import "firebase/auth";

//After downlaoding and making firebase make this initialize App
// This is what gives us access to the Firebase authentication
//information can be found at https://firebase.google.com/

firebase.initializeApp({
    apiKey: "AIzaSyDHEVKh9NRb3QJJsD-im1lmOhb61iaA-MA",
    authDomain: "revoverflow.firebaseapp.com",
    databaseURL: "https://revoverflow-default-rtdb.firebaseio.com",
    projectId: "revoverflow",
    storageBucket: "revoverflow.appspot.com",
    messagingSenderId: "505995803676",
    appId: "1:505995803676:web:84f1a9d4f52f10c550f3d9"
})

export default firebase