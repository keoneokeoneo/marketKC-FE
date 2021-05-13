import {
  AuthState,
  AUTH_INIT,
  AUTH_INIT_ERROR,
  AUTH_INIT_SUCCESS,
  AUTH_LOGIN,
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_SUCCESS,
  AUTH_REGISTER,
  AUTH_REGISTER_ERROR,
  AUTH_REGISTER_SUCCESS,
} from './types';
import { AuthAction } from './action';

const initialState: AuthState = {
  login: {
    loading: false,
    data: '',
    error: null,
  },
  register: {
    loading: false,
    data: '',
    error: null,
  },
  validation: {
    loading: false,
    error: null,
    data: {
      id: '',
      token: '',
    },
  },
};

export const authReducer = (
  state: AuthState = initialState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case AUTH_INIT:
      return {
        ...state,
        validation: {
          ...state.validation,
          loading: true,
        },
      };
    case AUTH_INIT_SUCCESS:
      return {
        ...state,
        validation: {
          ...state.validation,
          loading: false,
          data: action.data,
        },
      };
    case AUTH_INIT_ERROR:
      return {
        ...state,
        validation: {
          ...state.validation,
          loading: false,
          error: action.error,
        },
      };
    case AUTH_LOGIN:
      return {
        ...state,
        login: {
          ...state.login,
          loading: true,
        },
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          ...state.login,
          loading: false,
          data: action.data,
        },
      };
    case AUTH_LOGIN_ERROR:
      return {
        ...state,
        login: {
          ...state.login,
          loading: false,
          error: action.error,
        },
      };
    case AUTH_REGISTER:
      return {
        ...state,
        register: {
          ...state.register,
          loading: true,
        },
      };
    case AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        register: {
          ...state.register,
          loading: false,
          data: action.data,
        },
      };
    case AUTH_REGISTER_ERROR:
      return {
        ...state,
        register: {
          ...state.register,
          loading: false,
          error: action.error,
        },
      };
    default:
      return state;
  }
};
