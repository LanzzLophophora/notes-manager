import { DELETE_NOTE, NOTE_ERROR, CREATE_NOTES_LIST, NOTE_REQUEST, NOTE_SUCCESS } from './constants';
// import {AUTH_SUCCESS} from '../auth/constants';

const initialState = {
  userId: '',
  notes: [],
  error: "",
  loading: false
};

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    // case SET_USER_ID:
    //   return {
    //     ...state,
    //     userId: action.payload
    //   };
    //
    // case ADD_NOTE:
    //   return {
    //     ...state,
    //     notes: [
    //       ...state.notes,
    //       action.payload
    //     ]
    //   };

    case NOTE_REQUEST:
      return {
        ...state,
        loading: true
      };

    case NOTE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notes: [
          ...state.notes,
            action.payload
        ]
      };

    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === action.id ? { ...note, deleted: !note.deleted } : note
        )
      };

    case CREATE_NOTES_LIST:
      return {
        ...state,
        notes: action.payload
      };

    case NOTE_ERROR:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};