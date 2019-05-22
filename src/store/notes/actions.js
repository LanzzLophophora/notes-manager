import { GET_NOTES_LIST_REQUEST, GET_NOTES_LIST_SUCCESS, GET_NOTES_LIST_ERROR, SET_FILTER } from './constants';

export const getNotesListRequest = () => ({
  type: GET_NOTES_LIST_REQUEST
});

export const getNotesListSuccess = notes => ({
  type: GET_NOTES_LIST_SUCCESS,
  payload: notes
});

export const getNotesListError = message => ({
  type: GET_NOTES_LIST_ERROR,
  payload: message
});

export const setFilter = filteredNotes => ({
  type: SET_FILTER,
  payload: filteredNotes
});
