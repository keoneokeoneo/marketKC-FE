import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosError } from 'axios';
import {
  AUTH_INIT,
  AUTH_INITIATE,
  AUTH_INIT_ERROR,
  AUTH_INIT_SUCCESS,
  AUTH_LOGIN,
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_REGISTER,
  AUTH_REGISTER_ERROR,
  AUTH_REGISTER_SUCCESS,
} from './types';

/* ---------------------- 액션 생성 함수 ---------------------- */
export const initiate = () => ({ type: AUTH_INITIATE });

export const init = () => ({ type: AUTH_INIT });
export const initSuccess = (id: string, token: string) => ({
  type: AUTH_INIT_SUCCESS,
  data: {
    id: id,
    token: token,
  },
});
export const initError = (error: string) => ({
  type: AUTH_INIT_ERROR,
  error: error,
});

export const login = () => ({ type: AUTH_LOGIN });
export const loginSuccess = (id: string, token: string) => {
  const saveToLS = async (userID: string, userToken: String) => {
    try {
      await AsyncStorage.setItem(
        'UserData',
        JSON.stringify({ id: userID, token: userToken }),
      );
    } catch (e) {
      throw e;
    }
  };
  saveToLS(id, token);
  return {
    type: AUTH_LOGIN_SUCCESS,
    message: '로그인 성공',
    data: {
      id: id,
      token: token,
    },
  };
};
export const loginError = (error: string) => ({
  type: AUTH_LOGIN_ERROR,
  error: error,
});

export const register = () => ({ type: AUTH_REGISTER });
export const registerSuccess = (message: string) => ({
  type: AUTH_REGISTER_SUCCESS,
  data: message,
});
export const registerError = (error: string) => ({
  type: AUTH_REGISTER_ERROR,
  error: error,
});

export const logout = () => {
  const clear = async () => {
    try {
      await AsyncStorage.removeItem('UserData');
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  clear();
  return { type: AUTH_LOGOUT };
};
/* --------------------------------------------------------- */

/* ---------------------- 액션 생성 함수 타입 ---------------------- */
type AuthInitAction =
  | ReturnType<typeof init>
  | ReturnType<typeof initSuccess>
  | ReturnType<typeof initError>;

type AuthLoginAction =
  | ReturnType<typeof login>
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof loginError>;

type AuthRegisterAction =
  | ReturnType<typeof register>
  | ReturnType<typeof registerSuccess>
  | ReturnType<typeof registerError>;

export type AuthAction =
  | AuthInitAction
  | AuthLoginAction
  | AuthRegisterAction
  | ReturnType<typeof initiate>
  | ReturnType<typeof logout>;
/* ------------------------------------------------------------ */
