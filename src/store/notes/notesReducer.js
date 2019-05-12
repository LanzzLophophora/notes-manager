import { CREATE_NOTE, DELETE_NOTE } from './constants';

const initialState = {
  // userId: '',
  notes: [],
};

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTE:
      return {
        ...state,
        notes: [
          ...state.notes,
          {
            id: action.id,
            title: action.title,
            body: action.body,
            completed: false,
            deleted: false
          }
        ]
      };

    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === action.id ? { ...note, deleted: !note.deleted } : note
        )
      };

    default:
      return state;
  }
};