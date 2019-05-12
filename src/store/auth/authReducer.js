import { LOG_OUT, LOG_IN, AUTH_REQUEST, AUTH_SUCCESS, AUTH_ERROR } from './constants';
// import firebase from '../config/Fire';

const initialState = {
  // user: firebase.auth().currentUser,
  user: undefined,
  isLoading: false,
  error: '',
  noReg: false
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false
      };

    case AUTH_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case LOG_OUT:
      return {
        ...state,
        user: undefined
      };

    case LOG_IN:
      return {
        ...state,
        noReg: true
      };

    default:
      return state;
  }
};