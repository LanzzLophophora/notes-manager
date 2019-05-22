import firebase from './config/firebase';
import uuid from 'uuid/v4';

const db = firebase.firestore();

export const createNote = () => {
  const uid = firebase.auth().currentUser.uid;
  const notesCollection = db.collection("users").doc(`${uid}`).collection("notes");
  const note = {
    id: uuid(),
    body: "",
    completed: false,
    deleted: false,
    oneNoteGroups: [],
  };

  const requestHandler = (resolve, reject) => {
    notesCollection.doc(note.id).set(note)
      .then(() => resolve(note))
      .catch(error => reject(error.message))
  };
  return new Promise(requestHandler);
};

export const fetchNote = id => {
  const uid = firebase.auth().currentUser.uid;
  const currentNote = db.collection("users").doc(`${uid}`).collection("notes").doc(id);
  const requestHandler = (resolve, reject) => {
    currentNote.get()
      .then(note => resolve(note.data()))
      .catch(error => reject(error.message))
  };
  return new Promise(requestHandler);
};

export const saveNote = (note) => {
  const uid = firebase.auth().currentUser.uid;
  const notesCollection = db.collection("users").doc(`${uid}`).collection("notes");
  const requestHandler = (resolve, reject) => {
    notesCollection.doc(note.id).set(note)
      .then(note => resolve(note))
      .catch(error => reject(error.message))
  };
  return new Promise(requestHandler);
};

export const deleteNote = id => {
  const uid = firebase.auth().currentUser.uid;
  const noteDelete = db.collection("users").doc(`${uid}`).collection("notes").doc(id);
  const requestHandler = (resolve, reject) => {
    noteDelete.delete()
      .then(() => resolve(id))
      .catch(error => reject(error.message))
  };
  return new Promise(requestHandler);
};
