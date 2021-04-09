import {
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
  | ReturnType<typeof register>
  | ReturnType<typeof registerSuccess>
  | ReturnType<typeof registerFailure>
  | ReturnType<typeof registerInit>;

export type AuthState = {
  login: {
    status: string;
  };
  register: {
    status: 'WAITING' | 'SUCCESS' | 'FAILURE' | 'INIT';
    error: string;
  };
  status: {
    valid: boolean;
    isLoggedIn: false;
    currentUser: string;
  };
};
