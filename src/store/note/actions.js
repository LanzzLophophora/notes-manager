import {
  CREATE_NOTE_REQUEST, CREATE_NOTE_SUCCESS, CREATE_NOTE_ERROR,
  FETCH_NOTE_REQUEST, FETCH_NOTE_SUCCESS, FETCH_NOTE_ERROR,
  SAVE_NOTE_REQUEST, SAVE_NOTE_SUCCESS, SAVE_NOTE_ERROR,
  DELETE_NOTE_REQUEST, DELETE_NOTE_SUCCESS, DELETE_NOTE_ERROR,
} from '../note/constants';

export const createNoteRequest = () => ({
  type: CREATE_NOTE_REQUEST
});

export const createNoteSuccess = note => ({
  type: CREATE_NOTE_SUCCESS,
  payload: note
});

export const createNoteError = message => ({
  type: CREATE_NOTE_ERROR,
  payload: message
});

export const fetchNoteRequest = () => ({
  type: FETCH_NOTE_REQUEST
});

export const fetchNoteSuccess = noteItem => ({
  type: FETCH_NOTE_SUCCESS,
  payload: noteItem
});

export const fetchNoteError = message => ({
  type: FETCH_NOTE_ERROR,
  payload: message
});

export const saveNoteRequest = () => ({
  type: SAVE_NOTE_REQUEST
});

export const saveNoteSuccess = noteItem => ({
  type: SAVE_NOTE_SUCCESS,
  payload: noteItem
});

export const saveNoteError = message => ({
  type: SAVE_NOTE_ERROR,
  payload: message
});

export const deleteNoteRequest = () => ({
  type: DELETE_NOTE_REQUEST
});

export const deleteNoteSuccess = id => ({
  type: DELETE_NOTE_SUCCESS,
  payload: id
});

export const deleteNoteError = message => ({
  type: DELETE_NOTE_ERROR,
  payload: message
});
