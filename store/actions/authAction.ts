import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Dispatch } from 'react';
import { Alert } from 'react-native';
import { LoginData, RegData } from '../../types/APITypes';
import {
  AuthDispatch,
  AUTH_INIT,
  AUTH_LOGIN,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_INIT,
  AUTH_LOGIN_SUCCESS,
  AUTH_REGISTER,
  AUTH_REGISTER_FAILURE,
  AUTH_REGISTER_INIT,
  AUTH_REGISTER_SUCCESS,
} from './authActionTypes';

//const BASE_URL = 'http://localhost:3001/api';
const BASE_URL = 'http://52.78.169.229:3001/api';

export const registerRequest = (regData: RegData) => {
  return (dispatch: Dispatch<AuthDispatch>) => {
    dispatch(register());

    return axios({
      method: 'POST',
      baseURL: BASE_URL,
      url: '/auth/register',
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
      baseURL: BASE_URL,
      url: '/auth/login',
      data: {
        username: loginData.userEmail,
        password: loginData.userPW,
      },
    })
      .then(res => {
        console.log(res.data);
        if (res.data.code === 1) {
          dispatch(loginSuccess(res.data.access_token, res.data.userID));
        } else {
          dispatch(loginFailure(res.data.data));
        }
      })
      .catch(err => console.log(err));
  };
};

export const authInit = (userToken: string, userID: string) => {
  return { type: AUTH_INIT, userToken: userToken, userID: userID };
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
        'userData',
        JSON.stringify({ userToken: token, userID: id }),
      );
      Alert.alert('Success');
    } catch (e) {
      Alert.alert('Fail');
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
