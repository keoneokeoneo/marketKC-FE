import { AxiosError } from 'axios';

/* ---------------------- 액션 타입 ---------------------- */
export const AUTH_INIT = 'AUTH_INIT' as const;
export const AUTH_INIT_SUCCESS = 'AUTH_INIT_SUCCESS' as const;
export const AUTH_INIT_ERROR = 'AUTH_INIT_ERROR' as const;

export const AUTH_REGISTER = 'AUTH_REGISTER' as const;
export const AUTH_REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS' as const;
export const AUTH_REGISTER_ERROR = 'AUTH_REGISTER_ERROR' as const;

export const AUTH_LOGIN = 'AUTH_LOGIN' as const;
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS' as const;
export const AUTH_LOGIN_ERROR = 'AUTH_LOGIN_ERROR' as const;

export const AUTH_INITIATE = 'AUTH_INITIATE' as const;
export const AUTH_LOGOUT = 'AUTH_LOGOUT' as const;
/* ----------------------------------------------------- */

/* ---------------------- 액션 타입 ---------------------- */
type AUTH_INIT_TYPE =
  | typeof AUTH_INIT
  | typeof AUTH_INIT_SUCCESS
  | typeof AUTH_INIT_ERROR;

type AUTH_REGISTER_TYPE =
  | typeof AUTH_REGISTER
  | typeof AUTH_REGISTER_SUCCESS
  | typeof AUTH_REGISTER_ERROR;

type AUTH_LOGIN_TYPE =
  | typeof AUTH_LOGIN
  | typeof AUTH_LOGIN_SUCCESS
  | typeof AUTH_LOGIN_ERROR;

export type AUTH_ACTION_TYPE =
  | AUTH_INIT_TYPE
  | AUTH_REGISTER_TYPE
  | AUTH_LOGIN_TYPE
  | typeof AUTH_LOGOUT
  | typeof AUTH_INITIATE;
/* ----------------------------------------------------- */

export type AuthState = {
  login: {
    loading: boolean;
    data: string | null;
    error: string | null;
  };
  register: {
    loading: boolean;
    data: string | null;
    error: string | null;
  };
  validation: {
    loading: boolean;
    error: Error | AxiosError | null;
    data: { id: string; token: string } | null;
  };
};
