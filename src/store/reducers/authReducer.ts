import { AuthActions } from '../actions/authAction';
import {
  AUTH_INIT,
  AUTH_INIT_FAILURE,
  AUTH_INIT_SUCCESS,
  AUTH_LOGIN,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_INIT,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_REGISTER,
  AUTH_REGISTER_FAILURE,
  AUTH_REGISTER_INIT,
  AUTH_REGISTER_SUCCESS,
} from '../actions/authActionTypes';
import { AuthState } from '../types';

const initialState: AuthState = {
  login: {
    code: 0,
    message: '',
    stage: 'INIT',
  },
  register: {
    code: 0,
    message: '',
    stage: 'INIT',
  },
  validation: {
    isLoggedIn: false,
    currentUserID: '',
    currentUserToken: '',
    status: {
      code: 0,
      message: '',
      stage: 'INIT',
    },
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
        validation: {
          ...state.validation,
          status: {
            ...state.validation.status,
            stage: 'FETCHING',
          },
        },
      };
    case AUTH_INIT_SUCCESS:
      return {
        ...state,
        validation: {
          isLoggedIn: true,
          currentUserID: action.userID,
          currentUserToken: action.userToken,
          status: {
            code: 200,
            message: '사용자 인증에 성공했습니다.',
            stage: 'SUCCESS',
          },
        },
      };
    case AUTH_INIT_FAILURE:
      return {
        ...state,
        validation: {
          ...state.validation,
          status: {
            code: action.code,
            message: action.message,
            stage: 'FAILURE',
          },
        },
      };
    case AUTH_REGISTER:
      return {
        ...state,
        register: {
          ...state.register,
          stage: 'FETCHING',
        },
      };
    case AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        register: {
          code: 201,
          message: '회원가입에 성공했습니다.',
          stage: 'SUCCESS',
        },
      };
    case AUTH_REGISTER_FAILURE:
      return {
        ...state,
        register: {
          code: action.code,
          message: action.message,
          stage: 'FAILURE',
        },
      };
    case AUTH_REGISTER_INIT:
      return {
        ...state,
        register: {
          code: 0,
          message: '',
          stage: 'INIT',
        },
      };
    case AUTH_LOGIN:
      return {
        ...state,
        login: {
          ...state.login,
          stage: 'FETCHING',
        },
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          code: 201,
          message: '로그인에 성공했습니다.',
          stage: 'SUCCESS',
        },
        validation: {
          ...state.validation,
          currentUserID: action.userID,
          currentUserToken: action.userToken,
          isLoggedIn: true,
        },
      };
    case AUTH_LOGIN_FAILURE:
      return {
        ...state,
        login: {
          code: action.code,
          message: action.message,
          stage: 'FAILURE',
        },
      };
    case AUTH_LOGIN_INIT:
      return {
        ...state,
        login: {
          code: 0,
          message: '',
          stage: 'INIT',
        },
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        validation: {
          currentUserID: '',
          currentUserToken: '',
          isLoggedIn: false,
          status: {
            code: 0,
            message: '',
            stage: 'INIT',
          },
        },
      };
    default:
      return state;
  }
};
