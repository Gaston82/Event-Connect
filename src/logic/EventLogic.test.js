import { addMyEvents, createNewAsistente, removeAssistant,getUserById,removeMyEvents }from './EventLogic';
import { addArrayEllement }from '../services/data'
import * as firebase from "firebase/app";
import { firebaseConfig } from '../config';
import "firebase/firestore";

firebase.initializeApp(firebaseConfig);



const USER ={
  name: 'userTest',
  email:'usertest@gmail.com',
  id: '05d7KS35KdRZHbAgrtznra7B7cF3',
  myEvents:[]
}


/*
describe('addMyEvents',() =>{

    let eventId, eventImg, eventName
  
    beforeEach(()=>{
      
      eventId = `eventId-${Math.random()}`
      eventImg = `eventImg-${Math.random()}`
      eventName=`eventName-${Math.random()}`
    
      
    })

    test('should add an attendee to the collection asistentes', async() => {
      const db = firebase.firestore();
      //const document = await db.collection("asistentes").doc(eventId).get();
      const result = await createNewAsistente("asistentes",user,eventId)
      expect("asistentes".length>0).toBe(true);
      expect(result).toBe(undefined);
      
     // const userProfile = await createNewWithId('profiles', { email,name,myEvents},result.id)
     //expect().toBe(false);
       
    }) 

    // Preguntar si deberia poner describe y beforeeach antes de este test

   /* test('should remove an attendee from asistentes', async() => {



      const db = firebase.firestore();
      const document = await db.collection("asistentes").doc(eventId).get();
      const newAttendee = await createNewAsistente("asistentes",user,eventId)
      const result = await removeAssistant("asistentes",user,eventId)
     // expect("asistentes".length<1).toBe(true);
      expect(result).toBe(undefined);
      
     // const userProfile = await createNewWithId('profiles', { email,name,myEvents},result.id)
     //expect().toBe(false);
     
       
    }) 
    */




  /*
describe('removeAssistant',() =>{

  let eventId, eventImg, eventName

  beforeEach(()=>{
    
    eventId = `eventId-${Math.random()}`
    eventImg = `eventImg-${Math.random()}`
    eventName=`eventName-${Math.random()}`
  
    
  })

  test('should remove an attendee from asistentes', async() => {

    const db = firebase.firestore();
    const document = await db.collection("asistentes").doc(eventId).get();
    const newAttendee = await createNewAsistente("asistentes",user,eventId)
    const result = await removeAssistant("asistentes",user,eventId)
   // expect("asistentes".length<1).toBe(true);
    expect(result).toBe(undefined);
    
   // const userProfile = await createNewWithId('profiles', { email,name,myEvents},result.id)
   //expect().toBe(false);
   
     
  }) 



})

*/



const EVENT = {
  eventId :`eventId-${Math.random()}`,
  eventImg :`eventImg-${Math.random()}`,
  eventName:`eventName-${Math.random()}`

}


describe('addMyEvents',() =>{


    
  test('should add an event to my events', async() => {

    await addMyEvents("profiles",USER.id,EVENT)
    const user = await getUserById("profiles",USER.id)
    console.log(user.myEvents);
    const { myEvents} = user
    const eventToMatch = myEvents.filter(event =>event.event.eventName === EVENT.eventName)
    console.log(eventToMatch.length);
    
    expect(eventToMatch.length >0).toBe(true);
  
  }) 


})

describe('removeMyEvents',() =>{


    
  test('should remove an event to my events', async() => {

    await removeMyEvents("profiles",USER.id,EVENT)
    const user = await getUserById("profiles",USER.id)
    const { myEvents} = user
    const eventToMatch = myEvents.filter(event =>event.event.eventName === EVENT.eventName)
    console.log(eventToMatch.length);
    
    expect(eventToMatch.length <1).toBe(true);
  
  }) 


})

describe('createNewAsistente',() =>{

 // Compruebo en la colleccion de asistentes, en el array users si se ha agregado un asistente con el mismo id de USER

  test('should add an attendee to the collection asistentes', async() => {

    await createNewAsistente("asistentes",USER,EVENT.eventId)
    const event = await getUserById("asistentes",EVENT.eventId)
    const { users} = event
    const usersToMatch = users.filter(user =>user.id === USER.id)

    console.log("asistentes".length,EVENT.eventId);
    console.log("asistentes",EVENT.eventId);
    console.log(usersToMatch,USER.id);

    expect(usersToMatch.length >0).toBe(true);
  
  }) 

})

describe('createNewAsistente',() =>{

 // Compruebo en la colleccion de asistentes, en el array users si se ha agregado un asistente con el mismo id de USER

  test('should add an attendee to the collection asistentes', async() => {

    await createNewAsistente("asistentes",USER,EVENT.eventId)
    const event = await getUserById("asistentes",EVENT.eventId)
    const { users} = event
    const usersToMatch = users.filter(user =>user.id === USER.id)

    console.log("asistentes".length,EVENT.eventId);
    console.log("asistentes",EVENT.eventId);
    console.log(usersToMatch,USER.id);

    expect(usersToMatch.length >0).toBe(true);
  
  }) 

})

describe('removeAssistant',() =>{

  // 
 
   test('should remove an attendee to the collection asistentes', async() => {
 
     await removeAssistant("asistentes",USER,EVENT.eventId)
     const event = await getUserById("asistentes",EVENT.eventId)
     const { users} = event
     const usersToMatch = users.filter(user =>user.id === USER.id)
 
     //console.log("asistentes".length,EVENT.eventId);
     //console.log("asistentes",EVENT.eventId);
     //console.log(usersToMatch,USER.id);
 
     expect(usersToMatch.length <1).toBe(true);
     console.log(EVENT.eventId,USER.id);
     
   
   }) 
  
 
 })



  /*
  test('should add an attendee', async() => {
    const db = firebase.firestore();
    const document = await db.collection("asistentes").doc(eventId).get();
    const result = await createNewAsistente("asistentes",user,eventId)
    expect("asistentes".length>0).toBe(true);
    expect(result).toBe(undefined);
    
   // const userProfile = await createNewWithId('profiles', { email,name,myEvents},result.id)
   //expect().toBe(false);
     
  }) 

  /*
    test('should return a user object', async() => {
      const result = await registro(email, password)
      const userProfile = await createNewWithId('profiles', { email,name,myEvents},result.id)
       
      const user = await getUserById(result.id);
      
      expect(user).toBeInstanceOf(Object);
      expect(user.email).toEqual(email)
      expect(user)
  
        // expect(typeof getUserById).toBe('function');
    });
  */