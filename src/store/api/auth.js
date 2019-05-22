import firebase from './config/firebase';

const db = firebase.firestore();

export const signIn = (email, password) => {
  const requestHandler = (resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(data => resolve(data))
      .catch(error => reject(error))
  };
  return new Promise(requestHandler)
};

export const signOut = () => {
  const requestHandler = (resolve, reject) => {
    firebase.auth().signOut()
      .then(data => resolve(data))
      .catch(error => reject(error.message))
  };
  return new Promise(requestHandler)
};

export const registration = (email, password) => {
  const requestHandler = (resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(data => resolve(data))
      .catch(error => reject(error.message))
  };
  return new Promise(requestHandler)
};

export const getUserName = () => {
  const requestHandler = (resolve, reject) => {
    const uid = firebase.auth().currentUser.uid;
    db.collection("users").doc(`${uid}`).get()
      .then(data => resolve(data))
      .catch(error => reject(error.message))
  };
  return new Promise(requestHandler)
};

export const setName = name => {
  const requestHandler = (resolve, reject) => {
    const uid = firebase.auth().currentUser.uid;
    db.collection("users").doc(`${uid}`).set({ name })
      .then(data => resolve(data))
      .catch(error => reject(error.message))
  };
  return new Promise(requestHandler)
};
