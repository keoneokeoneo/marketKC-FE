import {
  authInit,
  login,
  loginFailure,
  loginInit,
  loginSuccess,
  register,
  registerFailure,
  registerInit,
  registerSuccess,
} from '../actions/authAction';

export interface UserData {
  userID: string;
  userName: string;
  userEmail: string;
}

export type AuthActions =
  | ReturnType<typeof authInit>
  | ReturnType<typeof register>
  | ReturnType<typeof registerSuccess>
  | ReturnType<typeof registerFailure>
  | ReturnType<typeof registerInit>
  | ReturnType<typeof login>
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof loginFailure>
  | ReturnType<typeof loginInit>;

export type AuthState = {
  login: {
    status: 'WAITING' | 'SUCCESS' | 'FAILURE' | 'INIT';
    error: string;
  };
  register: {
    status: 'WAITING' | 'SUCCESS' | 'FAILURE' | 'INIT';
    error: string;
  };
  status: {
    valid: boolean;
    isLoggedIn: boolean;
    currentUserToken: string;
    currentUserID: string;
  };
};
