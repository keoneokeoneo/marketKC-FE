import { UserActions } from '../actions/userAction';
import { UserState } from '../types';

const initialState: UserState = {
  user: {
    userID: '',
    userName: '',
    userEmail: '',
    userProfileImgUrl: '',
    userWalletAddr: '',
    userCreatedAt: '',
    userUpdatedAt: '',
  },
  feedCategoreis: [],
};

export const userReducer = (
  state: UserState = initialState,
  action: UserActions,
): UserState => {
  switch (action.type) {
    default:
      return state;
  }
};
