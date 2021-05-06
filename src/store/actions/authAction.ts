import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Dispatch } from 'react';
import { API_BASE_URL } from '../../config';
import { LoginData, RegData } from '../../types/APITypes';
import {
  AuthDispatch,
  AUTH_INIT_FAILURE,
  AUTH_INIT_SUCCESS,
  AUTH_LOGIN,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_INIT,
  AUTH_LOGIN_SUCCESS,
  AUTH_REGISTER,
  AUTH_REGISTER_FAILURE,
  AUTH_REGISTER_INIT,
  AUTH_REGISTER_SUCCESS,
} from './authActionTypes';

export const registerRequest = (regData: RegData) => {
  return (dispatch: Dispatch<AuthDispatch>) => {
    dispatch(register());

    return axios({
      method: 'POST',
      baseURL: API_BASE_URL,
      url: '/api/auth/register',
      data: regData,
    })
      .then(res => {
        console.log(res.data);
        if (res.data.code === 1) {
          dispatch(registerSuccess());
        } else {
          dispatch(registerFailure(res.data.data));
        }
      })
      .catch(error => {
        console.log(error);
        dispatch(registerFailure('error'));
      });
  };
};

export const loginRequest = (loginData: LoginData) => {
  return (dispatch: Dispatch<AuthDispatch>) => {
    dispatch(login());

    return axios({
      method: 'POST',
      baseURL: API_BASE_URL,
      url: '/api/auth/login',
      data: {
        username: loginData.userEmail,
        password: loginData.userPW,
      },
    })
      .then(res => {
        console.log(res.data);
        // code, access_token, user data
        if (res.data.code === 200) {
          dispatch(loginSuccess(res.data.access_token, res.data.userID));
        } else {
          dispatch(loginFailure(res.data.data));
        }
      })
      .catch(err => console.log(err));
  };
};

export const requestTokenValidation = (userToken: string, userID: string) => {
  return (dispatch: Dispatch<AuthDispatch>) => {
    return axios({
      method: 'GET',
      baseURL: API_BASE_URL,
      url: '/profile',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then(res => {
        console.log(res);
        if (res.data.userID === userID) {
          dispatch(authInitSuccess(userToken, userID));
        } else {
          dispatch(authInitFailure(userToken, userID));
        }
      })
      .catch(err => console.log(err));
  };
};

export const authInitSuccess = (userToken: string, userID: string) => {
  return { type: AUTH_INIT_SUCCESS, userToken: userToken, userID: userID };
};

export const authInitFailure = (userToken: string, userID: string) => {
  return { type: AUTH_INIT_FAILURE, userToken: userToken, userID: userID };
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
export const registerFailure = (error: string) => {
  return { type: AUTH_REGISTER_FAILURE, error };
};

export const login = () => {
  return { type: AUTH_LOGIN };
};

export const loginSuccess = (userToken: string, userID: string) => {
  const saveData = async (token: string, id: string) => {
    try {
      await AsyncStorage.setItem(
        'authData',
        JSON.stringify({ userToken: token, userID: id }),
      );
    } catch (e) {
      console.log(e);
    }
  };
  saveData(userToken, userID);
  return { type: AUTH_LOGIN_SUCCESS, userToken: userToken, userID: userID };
};

export const loginFailure = (error: string) => {
  return { type: AUTH_LOGIN_FAILURE, error: error };
};

export const loginInit = () => {
  return { type: AUTH_LOGIN_INIT };
};

export type AuthActions =
  | ReturnType<typeof authInitSuccess>
  | ReturnType<typeof authInitFailure>
  | ReturnType<typeof register>
  | ReturnType<typeof registerSuccess>
  | ReturnType<typeof registerFailure>
  | ReturnType<typeof registerInit>
  | ReturnType<typeof login>
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof loginFailure>
  | ReturnType<typeof loginInit>;
