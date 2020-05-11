import * as firebase from "firebase/app";
import "firebase/firestore";
import { getUserById, registerUser, loginUser } from "./User";
import { firebaseConfig } from "../config";
import { registro, login } from "../services/auth";
import { createNewWithId } from "../services/data";

firebase.initializeApp(firebaseConfig);
//$ npm test -- --coverage --watchAll=false
const PROFILES_COLLECTION = "profiles";

describe("getUserById", () => {
  let email, password, name, myEvents;

  beforeEach(() => {
    email = `email-${Math.random()}@mail.com`;
    password = `password-${Math.random()}`;
    name = `name-${Math.random()}`;
    myEvents = [];
  });

  test("should return a user object", async () => {
    const result = await registro(email, password);
    const userProfile = await createNewWithId(
      "profiles",
      { email, name, myEvents },
      result.id
    );

    const user = await getUserById(result.id);

    expect(user).toBeInstanceOf(Object);
    expect(user.email).toEqual(email);
    expect(user);

    // expect(typeof getUserById).toBe('function');
  });

  test("should return null when user does not exist", async () => {
    const user = await getUserById("2R7Hhnkhh1PwJmGIfqhkvMaK1dC2");

    expect(user).toEqual(null);
  });
});

describe("loginUser", () => {
  let email, password, name, myEvents;
  /*
  beforeEach(async () => {
    email = `email-${Math.random()}@mail.com`;
    password = `password-${Math.random()}`;
    name = `name-${Math.random()}`;
  });
*/

  test("should login a user", async () => {
    const USER = {
      email: "logintest@gmail.com",
      password: "12345678",
    };
    const result = await loginUser(USER.email, USER.password);
    expect(result.succes).toBe(true);
  });
});

test("should return null  when a user is not register", async () => {
  const USER = {
    email: "logintestFake@gmail.com",
    password: "12345678",
  };
  const result = await login(USER.email, USER.password);
  expect(result.succes).toBe(false);
});

describe("registerUser", () => {
  let email, password, name, myEvents;

  beforeEach(async () => {
    email = `email-${Math.random()}@mail.com`;
    password = `password-${Math.random()}`;
    name = `name-${Math.random()}`;
  });

  test("should create a new user", async () => {
    const result = await registerUser(email, password, name, myEvents);

    //Conectarse a DB para encontrar usuario nuevo

    // const db = firebase.firestore();
    // const document = await db.collection(PROFILES_COLLECTION).doc(id).get();

    // const user = parseDocument(document);

    //Corrobarar que informacion del usuario cocinide con el que registramos

    // expect(user).toBeInstanceOf(Object);
    // expect(user.email).toEqual(email)
    // expect(user.id).toEqual(id)
    //expect(succes).not.toBeUndefined()
    // expect(typeof getUserById).toBe('function');
  });

  // test()
});

/*
export async function login(email,password){
    try{
        await firebase.auth().signInWithEmailAndPassword(email, password)
        return {succes:true};    
    }catch(error){
        console.log("registro=>error " , error);
        
        return {succes:false, error: error.code};    
        
    }
}
*/
