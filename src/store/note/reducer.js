import {
  CREATE_NOTE_REQUEST, CREATE_NOTE_SUCCESS, CREATE_NOTE_ERROR,
  FETCH_NOTE_REQUEST, FETCH_NOTE_SUCCESS, FETCH_NOTE_ERROR,
  SAVE_NOTE_REQUEST, SAVE_NOTE_SUCCESS, SAVE_NOTE_ERROR,
  DELETE_NOTE_REQUEST, DELETE_NOTE_SUCCESS, DELETE_NOTE_ERROR,
} from './constants'

const initialState = {
  noteItem: {
    body: "",
    id: "",
    completed: false,
    deleted: false,
    oneNoteGroups: [],
  },
  error: "",
  loading: true
};


export const note = (state = initialState, action) => {
  switch (action.type) {

    case CREATE_NOTE_REQUEST:
      return {
        ...state,
        loading: true
      };

    case CREATE_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        noteItem: action.payload
      };

    case CREATE_NOTE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case FETCH_NOTE_REQUEST:
      return {
        ...state,
        loading: true
      };

    case FETCH_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        noteItem: action.payload
      };

    case FETCH_NOTE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case SAVE_NOTE_REQUEST:
      return {
        ...state,
        loading: true
      };

    case SAVE_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        noteItem: action.payload
      };

    case SAVE_NOTE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case DELETE_NOTE_REQUEST:
      return {
        ...state,
        loading: true
      };

    case DELETE_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        noteItem: undefined
      };

    case DELETE_NOTE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};
