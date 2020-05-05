import { addMyEvents, createNewAsistente }from './EventLogic';
import { addArrayEllement }from '../services/data'
import * as firebase from "firebase/app";
import { firebaseConfig } from '../config';
import "firebase/firestore";

firebase.initializeApp(firebaseConfig);



const user ={
  name: 'userTest',
  email:'usertest@gmail.com',
  myEvents:[]
}

console.log("eventtest=>>>>user",user);


describe('addMyEvents',() =>{

    let eventId, eventImg, eventName
  
    beforeEach(()=>{
      
      eventId = `eventId-${Math.random()}`
      eventImg = `eventImg-${Math.random()}`
      eventName=`eventName-${Math.random()}`
    
      
    })

    test('should add an attendee', async() => {
      const db = firebase.firestore();
      const document = await db.collection("asistentes").doc(eventId).get();
      const result = await createNewAsistente("asistentes",user,eventId)
      expect("asistentes".length>0).toBe(true);
      expect(result).toBe(undefined);
      
     // const userProfile = await createNewWithId('profiles', { email,name,myEvents},result.id)
     //expect().toBe(false);
       
    }) 

  })

  
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