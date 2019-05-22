import firebase from './config/firebase';

const db = firebase.firestore();

export const getNotesCollections = uid => {
  const userNotesCollection = db.collection("users").doc(uid).collection("notes");
  const requestHandler = (resolve, reject) => {
    userNotesCollection.get()
      .then(({ docs }) => docs.map(doc => {
        return {
          ...doc.data(),
          id: doc.id
        }
      }))
      .then(notes => resolve(notes))
      .catch(error => reject(error.message))
  };
  return new Promise(requestHandler)
};
