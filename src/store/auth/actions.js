import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_ERROR, LOG_OUT, LOG_IN } from './constants';

export const authenticateRequest = () => {
  return  {
    type: AUTH_REQUEST
  }
};

export const authenticateSuccess = user => {
  return {
    type: AUTH_SUCCESS,
    payload: user
  }
};

export const authenticateError = message => {
  return {
    type: AUTH_ERROR,
    payload: message
  }
};

export const logOut = () => {
  return {
    type: LOG_OUT,
  }
};

export const login = () => {
  return {
    type: LOG_IN
  }
};