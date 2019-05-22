import {
  CREATE_NOTES_GROUP_REQUEST, CREATE_NOTES_GROUP_SUCCESS, CREATE_NOTES_GROUP_ERROR,
  GET_NOTES_GROUPS_REQUEST, GET_NOTES_GROUPS_SUCCESS, GET_NOTES_GROUPS_ERROR,
  DELETE_NOTES_GROUP_REQUEST, DELETE_NOTES_GROUP_SUCCESS, DELETE_NOTES_GROUP_ERROR,
} from './constants';

export const getNotesGroupsRequest = () => ({
  type: GET_NOTES_GROUPS_REQUEST
});

export const getNotesGroupsSuccess = allNotesGroups => ({
  type: GET_NOTES_GROUPS_SUCCESS,
  payload: allNotesGroups
});

export const getNotesGroupsError = message => ({
  type: GET_NOTES_GROUPS_ERROR,
  payload: message
});

export const createNotesGroupRequest = () => ({
  type: CREATE_NOTES_GROUP_REQUEST
});

export const createNotesGroupSuccess = group => ({
  type: CREATE_NOTES_GROUP_SUCCESS,
  payload: group
});

export const createNotesGroupError = message => ({
  type: CREATE_NOTES_GROUP_ERROR,
  payload: message
});

export const deleteNotesGroupRequest = () => ({
  type: DELETE_NOTES_GROUP_REQUEST
});

export const deleteNotesGroupSuccess = id => ({
  type: DELETE_NOTES_GROUP_SUCCESS,
  payload: id
});

export const deleteNotesGroupError = message => ({
  type: DELETE_NOTES_GROUP_ERROR,
  payload: message
});
