import { LOG_OUT, SET_NAME, AUTH_REQUEST, AUTH_SUCCESS, AUTH_ERROR } from './constants';

const initialState = {
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

    case SET_NAME:
      return {
        ...state,
        user: {
          ...state.user,
          nickname: action.payload
        }
      };

    case LOG_OUT:
      return {
        ...state,
        user: undefined
      };

    default:
      return state;
  }
};