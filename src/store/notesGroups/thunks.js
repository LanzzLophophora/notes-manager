import { createNotesGroup, getGroupsCollection, deleteNotesGroup } from '../api/notesGroups';
import {
  getNotesGroupsRequest, getNotesGroupsSuccess, getNotesGroupsError,
  createNotesGroupRequest, createNotesGroupSuccess, createNotesGroupError,
  deleteNotesGroupRequest, deleteNotesGroupSuccess, deleteNotesGroupError,
} from './actions';

import uuid from 'uuid/v4';

export const handleNotesGroupCreation = (groupName, id, onSuccess) => dispatch => {
  dispatch(createNotesGroupRequest());
  createNotesGroup(groupName, id)
    .then(group => {
      dispatch(createNotesGroupSuccess(group));
      onSuccess && onSuccess(group);
    })
    .catch(({ message }) => dispatch(createNotesGroupError(message)))
};

export const handleNotesGroupsManaging = (newGroup, onSuccess) => dispatch => {
  newGroup.forEach(group => {
    const id = uuid();
    dispatch(handleNotesGroupCreation(group.label, id, onSuccess));
  })
};

export const handleNotesGroupsGetting = (uid, onSuccess) => dispatch => {
  dispatch(getNotesGroupsRequest());
  getGroupsCollection(uid)
    .then(allNotesGroups => {
      dispatch(getNotesGroupsSuccess(allNotesGroups));
      onSuccess && onSuccess(allNotesGroups)
    })
    .catch(({ message }) => dispatch(getNotesGroupsError(message)))
};

export const handleDeleteNotesGroup = (id, onSuccess) => dispatch => {
  dispatch(deleteNotesGroupRequest());
  deleteNotesGroup(id)
    .then(id => {
      dispatch(deleteNotesGroupSuccess(id));
      handleNotesGroupsGetting();
      onSuccess && onSuccess()
    })
    .catch(({ message }) => dispatch(deleteNotesGroupError(message)))
};
