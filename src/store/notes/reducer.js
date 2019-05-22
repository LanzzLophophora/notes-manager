import { GET_NOTES_LIST_REQUEST, GET_NOTES_LIST_SUCCESS, GET_NOTES_LIST_ERROR, SET_FILTER } from './constants';
import { DELETE_NOTE_SUCCESS, SAVE_NOTE_SUCCESS } from '../note/constants';
import { DELETE_NOTES_GROUP_SUCCESS } from '../notesGroups/constants';

const initialState = {
  notes: [],
  filterNotes: [],
  error: "",
  loading: false
};

export const notes = (state = initialState, action) => {
  switch (action.type) {

    case GET_NOTES_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_NOTES_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        notes: action.payload,
      };

    case GET_NOTES_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SET_FILTER:
      return {
        ...state,
        filterNotes: action.payload
      };

    case DELETE_NOTES_GROUP_SUCCESS:
      return {
        ...state,
        filterNotes: state.filterNotes.filter(fn => fn.id !== action.payload)
      };

    case SAVE_NOTE_SUCCESS: {
      const updatedNotes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload
        }
        return note;
      });
      return {
        ...state,
        notes: updatedNotes,
      };
    }

    case DELETE_NOTE_SUCCESS:
      return {
        ...state,
        notes: state.notes.filter(n => n.id !== action.payload)
      };

    default:
      return state;
  }
};
