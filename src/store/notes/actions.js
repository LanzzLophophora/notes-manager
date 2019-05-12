import { CREATE_NOTE, DELETE_NOTE } from './constants';

export const createNote = note => {
  return (dispatch) => {
    dispatch({
      type: CREATE_NOTE,
      note
    })
  }
};

export const deleteNote = note => {
  return (dispatch) => {
    dispatch({
      type: DELETE_NOTE,
      note
    })
  }
};
