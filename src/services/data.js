import * as firebase from "firebase/app";
import "firebase/firestore";
import { firebaseConfig }from '../config.js'
function init(){
    firebase.initializeApp(firebaseConfig);
}

// Mediante esta funcion tendremos acceso a nuestra base de datos(función de ejemplo)
function getAssistent(){
    init();
    var db = firebase.firestore();
}