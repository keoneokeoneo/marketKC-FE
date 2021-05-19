import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { authAPI } from '../../utils/api';
import {
  LoginReq,
  RegisterReq,
  ValidationReq,
} from '../../utils/api/auth/types';
import { RootState } from '../reducer';
import {
  AuthAction,
  init,
  initError,
  initSuccess,
  login,
  loginError,
  loginSuccess,
  register,
  registerError,
  registerSuccess,
} from './action';

export const validateTokenThunk = (
  param: ValidationReq,
): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    dispatch(init());
    try {
      const res = await authAPI.validation(param.token);

      if (res.status === 200 && res.data.id === param.id) {
        dispatch(initSuccess(param.id, param.token));
      } else {
        dispatch(initError('유효하지 않은 정보입니다'));
      }
    } catch (e) {
      console.error(e);
      dispatch(initError(e.message));
    }
  };
};

export const loginThunk = (
  param: LoginReq,
): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    dispatch(login());
    try {
      const res = await authAPI.login(param);

      if (res.status === 200) {
        dispatch(loginSuccess(res.data.id, res.data.access_token));
      }
    } catch (e) {
      console.error(e);
      if (axios.isAxiosError(e) && e.response)
        dispatch(loginError(e.response.data));
      else {
        dispatch(loginError('알수없는에러'));
      }
    }
  };
};

export const registerThunk = (
  param: RegisterReq,
): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    dispatch(register());
    try {
      const res = await authAPI.register(param);
      console.log(res);
      if (res.status === 201) {
        dispatch(registerSuccess(res.data));
      }
    } catch (e) {
      console.error(e);
      if (axios.isAxiosError(e) && e.response) {
        dispatch(registerError(e.response.data));
      } else {
        dispatch(registerError('알수없는에러'));
      }
    }
  };
};
