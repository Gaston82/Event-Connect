import * as firebase from "firebase";

export async function registro(email, password) {
  try {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    return { succes: true, id: result.user.uid };
  } catch (error) {
    console.log("registro=>error ", error);

    return { succes: false, error: error.code };
  }
}

export async function login(email, password) {
  try {
    console.log("auth email test", email);

    await firebase.auth().signInWithEmailAndPassword(email, password);
    return { succes: true };
  } catch (error) {
    console.log("registro=>error ", error);

    return { succes: false, error: error.code };
  }
}

export function registerAuthObserver(callback) {
  firebase.auth().onAuthStateChanged(callback);
}

export async function salir() {
  try {
    await firebase.auth().signout();
    return { succes: true };
  } catch (error) {
    return { succes: false, error: error.code };
  }
}
