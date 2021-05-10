import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from 'react';
import { API_BASE_URL } from '../../config';
import {
  LoginData,
  LoginRes,
  RegData,
  ValidateTokenRes,
} from '../../types/APITypes';
import {
  AuthDispatch,
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
} from './authActionTypes';

export const registerRequest = (regData: RegData) => {
  return async (dispatch: Dispatch<AuthDispatch>) => {
    dispatch(register());

    try {
      const res = await axios.post(`${API_BASE_URL}/auth/register`, regData);
      dispatch(loginSuccess(res.data.access_token, res.data.id));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)
        dispatch(registerFailure(error.response.status, error.response.data));
      else console.log(error);
    }
  };
};

export const loginRequest = (loginData: LoginData) => {
  return (dispatch: Dispatch<AuthDispatch>) => {
    dispatch(login());
    return axios({
      baseURL: API_BASE_URL,
      url: '/auth/login',
      data: loginData,
      method: 'POST',
    })
      .then((res: AxiosResponse<LoginRes>) => {
        dispatch(loginSuccess(res.data.access_token, res.data.id));
      })
      .catch((error: AxiosError | Error) => {
        if (axios.isAxiosError(error) && error.response) {
          dispatch(loginFailure(error.response.status, error.response.data));
        } else console.log(error);
      });
  };
};

export const requestTokenValidation = (userToken: string, userID: string) => {
  return async (dispatch: Dispatch<AuthDispatch>) => {
    dispatch(authInit());
    try {
      const res: AxiosResponse<ValidateTokenRes> = await axios.get(
        `${API_BASE_URL}/auth/validateUser`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      if (res.status === 200) dispatch(authInitSuccess(userToken, userID));
      else console.log('Request Token Validation success but not 200', res);
    } catch (error) {
      //if(axios.isAxiosError(error) && error.response) dispatch(authInitFailure())
      console.log(error);
    }
  };
};

export const authInit = () => {
  return { type: AUTH_INIT };
};

export const authInitSuccess = (userToken: string, userID: string) => {
  return { type: AUTH_INIT_SUCCESS, userToken: userToken, userID: userID };
};

export const authInitFailure = (
  userToken: string,
  userID: string,
  code: number,
  message: string,
) => {
  return { type: AUTH_INIT_FAILURE, userToken, userID, code, message };
};

export const registerInit = () => {
  return { type: AUTH_REGISTER_INIT };
};
export const register = () => {
  return { type: AUTH_REGISTER };
};
export const registerSuccess = () => {
  return { type: AUTH_REGISTER_SUCCESS };
};
export const registerFailure = (code: number, message: string) => {
  return { type: AUTH_REGISTER_FAILURE, code, message };
};

export const login = () => {
  return { type: AUTH_LOGIN };
};

export const loginSuccess = (userToken: string, userID: string) => {
  const saveData = async (token: string, id: string) => {
    try {
      await AsyncStorage.setItem(
        'UserData',
        JSON.stringify({ userToken: token, userID: id }),
      );
    } catch (e) {
      console.log(e);
    }
  };
  saveData(userToken, userID);
  return { type: AUTH_LOGIN_SUCCESS, userToken: userToken, userID: userID };
};

export const loginFailure = (code: number, message: string) => {
  return { type: AUTH_LOGIN_FAILURE, code, message };
};

export const loginInit = () => {
  return { type: AUTH_LOGIN_INIT };
};

export const logout = () => {
  const clearData = async () => {
    try {
      await AsyncStorage.removeItem('UserData');
    } catch (e) {
      console.log(e);
    }
  };

  clearData();

  return { type: AUTH_LOGOUT };
};

export type AuthActions =
  | ReturnType<typeof authInit>
  | ReturnType<typeof authInitSuccess>
  | ReturnType<typeof authInitFailure>
  | ReturnType<typeof register>
  | ReturnType<typeof registerSuccess>
  | ReturnType<typeof registerFailure>
  | ReturnType<typeof registerInit>
  | ReturnType<typeof login>
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof loginFailure>
  | ReturnType<typeof loginInit>
  | ReturnType<typeof logout>;
