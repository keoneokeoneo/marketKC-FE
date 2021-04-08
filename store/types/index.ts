import { registerUser } from '../actions/userAction';

export const REGISTER_USER = 'user/REGISTER_USER' as const;

export interface RegData {
  userName: string;
  userEmail: string;
  userPW: string;
}

export type UserAction = ReturnType<typeof registerUser>;

export type UserState = {
  userID: string;
  userName: string;
  userEmail: string;
  userPW: string;
};
