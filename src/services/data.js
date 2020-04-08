import * as firebase from "firebase/app";
import "firebase/firestore";
import { firebaseConfig }from '../config.js'

    firebase.initializeApp(firebaseConfig);


// Mediante esta funcion tendremos acceso a nuestra base de datos(función de ejemplo)

async function getAssistent(id){

    const db = firebase.firestore();
    const querySnapshot=await db.collection("asistentes").where("idEvent", "==", id).get();
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
        });
    };

    async function getById(collection, id) {
       /* const db = firebase.firestore();
        const document = await db.collection(collection).doc(id).get();

        if (document.exists) {
          return parseDocument(document);
        }
        return null;
        */
      }

export  { getAssistent,getById };

