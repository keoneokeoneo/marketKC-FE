import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosError } from 'axios';
import {
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

/* ---------------------- 액션 생성 함수 ---------------------- */
export const init = () => ({ type: AUTH_INIT });
export const initSuccess = (id: string, token: string) => ({
  type: AUTH_INIT_SUCCESS,
  data: {
    id: id,
    token: token,
  },
});
export const initError = (error: Error | AxiosError) => ({
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
    data: '로그인 성공',
  };
};
export const loginError = (error: Error | AxiosError) => ({
  type: AUTH_LOGIN_ERROR,
  error: error,
});

export const register = () => ({ type: AUTH_REGISTER });
export const registerSuccess = (message: string) => ({
  type: AUTH_REGISTER_SUCCESS,
  data: message,
});
export const registerError = (error: Error | AxiosError) => ({
  type: AUTH_REGISTER_ERROR,
  error: error,
});
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

export type AuthAction = AuthInitAction | AuthLoginAction | AuthRegisterAction;
/* ------------------------------------------------------------ */
