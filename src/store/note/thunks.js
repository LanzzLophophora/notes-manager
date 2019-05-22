import {
  createNoteError, createNoteRequest, createNoteSuccess,
  fetchNoteRequest, fetchNoteSuccess, fetchNoteError,
  saveNoteRequest, saveNoteSuccess, saveNoteError,
  deleteNoteRequest, deleteNoteSuccess, deleteNoteError,
} from './actions';
import { fetchNote, saveNote, deleteNote } from '../api/note';
import { createNote } from '../api/note';
import { push } from "connected-react-router";

export const handleNoteCreation = () => dispatch => {
  dispatch(createNoteRequest());
  createNote()
    .then(note => {
      dispatch(createNoteSuccess(note));
      dispatch(push(`/notes/${note.id}`));
    })
    .catch(({ message }) => dispatch(createNoteError(message)));
};

export const handleNoteFetching = (id, onSuccess) => dispatch => {
  dispatch(fetchNoteRequest);
  fetchNote(id)
    .then( note => {
      dispatch(fetchNoteSuccess(note));
      onSuccess && onSuccess(note);
    })
    .catch(({ message }) => dispatch(fetchNoteError(message)));
};

export const handleNoteSaving = noteItem => dispatch => {
  dispatch(saveNoteRequest());
  saveNote(noteItem)
    .then(() => dispatch(saveNoteSuccess(noteItem)))
    .catch(({ message }) => dispatch(saveNoteError(message)));
};

export const handleNoteDeleting = id => (dispatch) => {
  dispatch(deleteNoteRequest());
  deleteNote(id)
    .then(() => dispatch(deleteNoteSuccess(id)))
    .catch(({ message }) => dispatch(deleteNoteError(message)));
};
