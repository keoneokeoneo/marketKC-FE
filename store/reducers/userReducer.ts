import { REGISTER_USER, UserAction, UserState } from '../types';

const initialState: UserState = {
  userID: '',
  userName: '',
  userEmail: '',
  userPW: '',
};

export const userReducer = (
  state: UserState = initialState,
  action: UserAction,
) => {
  switch (action.type) {
    case REGISTER_USER:
      return action.payload;
    default:
      return state;
  }
};
