import * as firebase from "firebase/app";
import "firebase/firestore";

//firebase.initializeApp(firebaseConfig);

let DB_CONNECTION = null;

function getDBConnection() {
  if (!DB_CONNECTION) {
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

async function getAssistent(id) {
  console.log("service data => id ", id);
  const db = firebase.firestore();
  const querySnapshot = await db
    .collection("asistentes")
    .where("idEvent", "==", id)
    .get();
  querySnapshot.forEach((doc) => {
    console.log("data get assistant", doc.id, doc.data());
  });
}


async function getById(collection,id) {
  const db = getDBConnection();
  const document = await db.collection(collection).doc(id).get();
  console.log("getbyid=>", collection, id);

  if (document.exists) {
    return parseDocument(document);
  }
  return null;
}
//Con esta funcion crearemos el perfil de usuario mediante el id automatico del registro

async function createNewWithId(collection, newObj, id) {
  const db = getDBConnection();
  try {
    const result = await db.collection(collection).doc(id).set(newObj);
    console.log("createnewwithid", result);

    return typeof result === "undefined";
    //return result.id;
  } catch (error) {
    return null;
  }
}



//intento reemplazar esta por una funcion general

async function removeAssistant(collection, user, id) {
  const db = getDBConnection();
  try {
    const result = await db
      .collection(collection)
      .doc(id)
      .update({
        users: firebase.firestore.FieldValue.arrayRemove(user),
      });
    console.log("removeasisitente -> result ", result);
  } catch (error) {
    console.log(error);
    return null;
  }
}

/*
async function createNewAsistente(collection, user, id) {
  const db = getDBConnection();
  try {
    const result = await db
      .collection(collection)
      .doc(id)
      .set(
        {
          users: firebase.firestore.FieldValue.arrayUnion(user),
        },
        { merge: true }
      );
    console.log("createNewasistente -> result ", result);
  } catch (error) {
    console.log(error);
    return null;
  }
}
*/


async function mergeArrayElement(collection, newObj, id) {
  const db = getDBConnection();
  try {
    const result = await db
      .collection(collection)
      .doc(id)
      .set(
        {
          users: firebase.firestore.FieldValue.arrayUnion(newObj),
        },
        { merge: true }
      );
    console.log("createNewasistente -> result ", result);
  } catch (error) {
    console.log(error);
    return null;
  }
}


//Esta funcion es casi igul que la funcion mergeArray(como poner el nombre del array?)
/*
async function addMyEvents(collection, id, { eventId, eventName, eventImg }) {

  const db = getDBConnection();
  try {
    const result = await db
      .collection(collection)
      .doc(id)
      .update({
          myEvents: firebase.firestore.FieldValue.arrayUnion({
          eventName: eventName,
          eventId: eventId,
          eventImg: eventImg,
        }),
      });
    console.log("addmyevent -> data",result);
  } catch (error) {
    console.log(error);
    return null;
  }
}
*/

async function addArrayEllement(collection,id,event){
  const db = getDBConnection();
  try {
    const result = await db
      .collection(collection)
      .doc(id)
      .update({
          myEvents: firebase.firestore.FieldValue.arrayUnion({
         event
        }),
      });
    console.log("addmyevent -> data",result);
  } catch (error) {
    console.log(error);
    return null;
  }

}

/*
async function removeMyEvents(collection, id, { eventId, eventName, eventImg }) {
  const db = getDBConnection();
  try {
    const result = await db
      .collection(collection)
      .doc(id)
      .update({
        myEvents: firebase.firestore.FieldValue.arrayRemove({
          eventName: eventName,
          eventId: eventId,
          eventImg: eventImg,
        }),
      });
  } catch (error) {
    console.log(error);
    return null;
  }
}
*/


async function removeArrayElement(collection,id, event ) {
  const db = getDBConnection();
  try {
    const result = await db
      .collection(collection)
      .doc(id)
      .update({
        myEvents: firebase.firestore.FieldValue.arrayRemove({
          event 
        })
      });
    console.log("removearrayelement -> result ", result);
  } catch (error) {
    console.log(error);
    return null;
  }
}

/*
async function removeArrayElement2(collection,user,id) {
  const db = getDBConnection();
  try {
    const result = await db
      .collection(collection)
      .doc(id)
      .update({
        users: firebase.firestore.FieldValue.arrayRemove({
          ...user 
         } )
      });
    console.log("removearrayelement -> result ", result);
    console.log("removeArrayElement2",collection);
    console.log("removeArrayElement2",{...user});
    
  } catch (error) {
    console.log(error);
    return null;
  }
}
*/

async function removeArrayElement2(collection,user,id) {
  const db = getDBConnection();
  try {
    const result = await db
      .collection(collection)
      .doc(id)
      .update({
        users: firebase.firestore.FieldValue.arrayRemove(
           user 
          )
      });
    console.log("removearrayelement -> result ", result);
    console.log("removeArrayElement2",collection);
    console.log("removeArrayElement2",{...user});
    
  } catch (error) {
    console.log(error);
    return null;
  }
}



async function updateElement(collection,id,updatedFields){
  const db = getDBConnection();
  try{
    const result = await db.collection(collection).doc(id).update(updatedFields);
    console.log("data updateelement",result);
    return typeof result ==="undefined"
  }catch(error){
    return null;
  }
}

function getRealTime(id,callback) {
  const db = getDBConnection();
  return db.collection('chat').doc(id).onSnapshot((doc)=>{
   callback({id: doc.id,
  ...doc.data()}) 
  });

}


function parseQuerySnapshot(querySnapshot) {
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push(parseDocument(doc));
  });
  return data;
}



export {
  getAssistent,
  getById,
  createNewWithId,
 // createNewAsistente,
  mergeArrayElement,
  removeAssistant,
 // addMyEvents,
  addArrayEllement,
  //removeMyEvents,
  removeArrayElement,
  removeArrayElement2,
  updateElement,
  getRealTime
};

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
