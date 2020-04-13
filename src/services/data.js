import * as firebase from "firebase/app";
import "firebase/firestore";
import { firebaseConfig }from '../config.js'

    //firebase.initializeApp(firebaseConfig);

let DB_CONNECTION = null;

function getDBConnection(){
if(!DB_CONNECTION){
    DB_CONNECTION = firebase.firestore();
}
return DB_CONNECTION;
}

/*
const db = _getDBConnection();
return db.collection(collection).onSnapshot((querySnapshot)=>{
    callback(_parseQuerySnapshot)
})
*/


function parseDocument(doc) {
    return {
      id: doc.id,
      ...doc.data(),
    };
  }

// Mediante esta funcion tendremos acceso a nuestra base de datos(función de ejemplo)

async function getAssistent(id){

    const db = firebase.firestore();
    const querySnapshot=await db.collection("asistentes").where("idEvent", "==", id).get();
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
        });
    };

    async function getById(collection, id) {
       const db = getDBConnection();
        const document = await db.collection(collection).doc(id).get();

        if (document.exists) {
          return parseDocument(document);
        }
        return null;
        
        
      }
//Con esta funcion crearemos el perfil de usuario mediante el id automatico del registro

      async function createNewWithId(collection,newObj,id){
       const db = getDBConnection();
       try{
          const result = await db.collection(collection).doc(id).set(newObj)
          //console.log("createNewWithId -> result ",result)
          return typeof result === 'undefined';
          return result.id;
        }catch(error){
        return null;
       }
      }

export  { getAssistent,getById,createNewWithId };

/*
import * as firebase from 'firebase/app';
import 'firebase/firestore';

let DB_CONNECTION = null;

function getDBConnection() {
  if (!DB_CONNECTION) {
    DB_CONNECTION = firebase.firestore();
  }
  return DB_CONNECTION;
}

function parseDocument(doc) {
  return {
    id: doc.id,
    ...doc.data(),
  };
}

function parseQuerySnapshot(querySnapshot) {
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push(parseDocument(doc));
  });
  return data;
}

function getRealTimeFiltered(collection, callback, filters) {
  const db = getDBConnection();

  let collectionQuery = db.collection(collection);

  if (filters) {
    collectionQuery = collectionQuery.where(filters.field, filters.operator, filters.value);
  }

  return collectionQuery.onSnapshot((querySnapshot) => {
    callback(parseQuerySnapshot(querySnapshot));
  });
}

function getRealTime(collection, callback) {
  const db = getDBConnection();
  return db.collection(collection).onSnapshot((querySnapshot) => {
    callback(parseQuerySnapshot(querySnapshot));
  });
}

async function get(collection) {
  const db = getDBConnection();
  const querySnapshot = await db.collection(collection).get();

  return parseQuerySnapshot(querySnapshot);
}

async function getById(collection, id) {
  const db = getDBConnection();
  const document = await db.collection(collection).doc(id).get();

  if (document.exists) {
    return parseDocument(document);
  }
  return null;
}

async function createNew(collection, newObj) {
  const db = getDBConnection();
  try {
    const result = await db.collection(collection).add(newObj);
    return result.id;
  } catch (err) {
    return null;
  }
}

async function createNewWithId(collection, newObj, id) {
  const db = getDBConnection();
  try {
    const result = await db.collection(collection).doc(id).set(newObj);
    return typeof result === 'undefined';
  } catch (err) {
    return null;
  }
}

async function updateFieldsById(collection, id, updatedFields) {
  const db = getDBConnection();
  const result = await db.collection(collection).doc(id).update(updatedFields);
  return typeof result === 'undefined';
}

async function removeById(collection, id) {
  const db = getDBConnection();
  const result = await db.collection(collection).doc(id).delete();
  return typeof result === 'undefined';
}


export {
  get,
  getById,
  createNew,
  createNewWithId,
  updateFieldsById,
  getRealTime,
  getRealTimeFiltered,
  removeById,
};


*/