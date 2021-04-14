import {
  AUTH_INIT,
  AUTH_LOGIN,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_INIT,
  AUTH_LOGIN_SUCCESS,
  AUTH_REGISTER,
  AUTH_REGISTER_FAILURE,
  AUTH_REGISTER_INIT,
  AUTH_REGISTER_SUCCESS,
} from '../actions/authActionTypes';
import { AuthActions, AuthState } from '../types';

const initialState: AuthState = {
  login: {
    status: 'INIT',
    error: '',
  },
  register: {
    status: 'INIT',
    error: '',
  },
  status: {
    valid: false,
    isLoggedIn: false,
    currentUserToken: '',
    currentUserID: '',
  },
};

export const authReducer = (
  state: AuthState = initialState,
  action: AuthActions,
): AuthState => {
  switch (action.type) {
    case AUTH_INIT:
      return {
        ...state,
        status: {
          valid: true,
          isLoggedIn: true,
          currentUserID: action.userID,
          currentUserToken: action.userToken,
        },
      };
    case AUTH_REGISTER:
      return {
        ...state,
        register: {
          status: 'WAITING',
          error: '',
        },
      };
    case AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        register: {
          ...state.register,
          status: 'SUCCESS',
        },
      };
    case AUTH_REGISTER_FAILURE:
      return {
        ...state,
        register: {
          status: 'FAILURE',
          error: action.error,
        },
      };
    case AUTH_REGISTER_INIT:
      return {
        ...state,
        register: {
          status: 'INIT',
          error: '',
        },
      };
    case AUTH_LOGIN:
      return {
        ...state,
        login: {
          ...state.login,
          status: 'WAITING',
        },
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          ...state.login,
          status: 'SUCCESS',
        },
        status: {
          valid: true,
          isLoggedIn: true,
          currentUserID: action.userID,
          currentUserToken: action.userToken,
        },
      };
    case AUTH_LOGIN_FAILURE:
      return {
        ...state,
        login: {
          status: 'FAILURE',
          error: action.error,
        },
      };
    case AUTH_LOGIN_INIT:
      return {
        ...state,
        login: {
          status: 'INIT',
          error: '',
        },
      };
    default:
      return state;
  }
};
