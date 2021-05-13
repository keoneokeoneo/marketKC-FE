import { ThunkAction } from 'redux-thunk';
import { authAPI } from '../../utils/api';
import {
  LoginReq,
  LoginRes,
  RegisterReq,
  ValidateTokenReq,
  ValidateTokenRes,
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
  param: ValidateTokenReq,
): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    dispatch(init());
    try {
      const res = await authAPI.validateToken<ValidateTokenRes>(param.token);

      if (res.status === 200 && res.data.id === param.id) {
        dispatch(initSuccess(param.id, param.token));
      } else {
        dispatch(initError(new Error()));
      }
    } catch (e) {
      dispatch(initError(e));
    }
  };
};

export const loginThunk = (
  param: LoginReq,
): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    dispatch(login());
    try {
      const res = await authAPI.login<LoginRes>(param);

      if (res.status === 200) {
        dispatch(loginSuccess(res.data.id, res.data.access_token));
      }
    } catch (e) {
      dispatch(loginError(e));
    }
  };
};

export const registerThunk = (
  param: RegisterReq,
): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    dispatch(register());
    try {
      const res = await authAPI.register<string>(param);

      if (res.status === 200) {
        dispatch(registerSuccess(res.data));
      }
    } catch (e) {
      dispatch(registerError(e));
    }
  };
};
