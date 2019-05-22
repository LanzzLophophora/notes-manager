import firebase from './config/firebase';
import uuid from 'uuid/v4';

const db = firebase.firestore();

export const createNotesGroup = (groupName, id) => {
  const uid = firebase.auth().currentUser.uid;
  const groupsCollection = db.collection("users").doc(`${uid}`).collection("groups");
  const currentId = id || uuid();
  const group = {
    value: currentId,
    label: groupName,
    id: currentId
  };

  const requestHandler = (resolve, reject) => {
    groupsCollection.doc(group.value).set(group)
      .then(() => resolve(group))
      .catch(error => reject(error.message))
  };
  return new Promise(requestHandler);
};

export const getGroupsCollection = uid => {
  const userID = uid || firebase.auth().currentUser.uid;
  const userGroupsCollection = db.collection("users").doc(userID).collection("groups");
  const requestHandler = (resolve, reject) => {
    userGroupsCollection.get()
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

export const deleteNotesGroup = id => {
  const uid = firebase.auth().currentUser.uid;
  const groupForDelete = db.collection("users").doc(`${uid}`).collection("groups").doc(`${id}`);
  const requestHandler = (resolve, reject) => {
    groupForDelete.delete()
      .then(() => resolve(id))
      .catch(error => reject(error.message))
  };
  return new Promise(requestHandler)
};
