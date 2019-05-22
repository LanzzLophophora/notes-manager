import {
  CREATE_NOTES_GROUP_REQUEST, CREATE_NOTES_GROUP_SUCCESS, CREATE_NOTES_GROUP_ERROR,
  GET_NOTES_GROUPS_REQUEST, GET_NOTES_GROUPS_SUCCESS, GET_NOTES_GROUPS_ERROR,
  DELETE_NOTES_GROUP_REQUEST, DELETE_NOTES_GROUP_SUCCESS, DELETE_NOTES_GROUP_ERROR,
} from './constants';

const initialState = {
  allNotesGroups: [],
  error: "",
  loading: false
};

export const notesGroups = (state = initialState, action) => {
  switch (action.type) {

    case GET_NOTES_GROUPS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_NOTES_GROUPS_SUCCESS:
      return {
        ...state,
        loading: false,
        allNotesGroups: action.payload
      };

    case GET_NOTES_GROUPS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_NOTES_GROUP_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_NOTES_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        allNotesGroups: [
          ...state.allNotesGroups,
          action.payload
        ],
      };

    case CREATE_NOTES_GROUP_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_NOTES_GROUP_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_NOTES_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        allNotesGroups: state.allNotesGroups.filter(group => group.id !== action.payload.id),
      };

    case DELETE_NOTES_GROUP_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
