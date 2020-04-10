import * as firebase from "firebase/app";
import "firebase/firestore";
import { firebaseConfig }from '../config.js'

    firebase.initializeApp(firebaseConfig);

/*
function _getDBConnection(){
if(!DB_CONNECTION){
    DB_CONNECTION = firebase.firestore();
}
return DB_CONNECTION;
}
*/
/*
const db = _getDBConnection();
return db.collection(collection).onSnapshot((querySnapshot)=>{
    callback(_parseQuerySnapshot)
})
*/

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

      async function createNewWithId(collection,newObj,id){
       const db = _getDBConnection();
       try{
          const result = await db.collection(collection).doc(id).set(newObj);
          console.log("createNewWithId -> result ",result)
          return typeof result === 'undefined';
        }catch(error){
        return null;
       }
      }

export  { getAssistent,getById,createNewWithId };

