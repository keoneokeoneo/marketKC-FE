import {
  AUTH_REGISTER,
  AUTH_REGISTER_FAILURE,
  AUTH_REGISTER_INIT,
  AUTH_REGISTER_SUCCESS,
} from '../actions/ActionTypes';
import { AuthActions, AuthState } from '../types';

const initialState: AuthState = {
  login: {
    status: 'INIT',
  },
  register: {
    status: 'INIT',
    error: '',
  },
  status: {
    valid: false,
    isLoggedIn: false,
    currentUser: '',
  },
};

export const authReducer = (
  state: AuthState = initialState,
  action: AuthActions,
): AuthState => {
  switch (action.type) {
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
    default:
      return state;
  }
};
