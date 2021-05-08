import { UserActions } from '../actions/userAction';
import { USER_CHANGE_LOCATION, USER_INIT } from '../actions/userActionTypes';
import { UserState } from '../types';

const initialState: UserState = {
  userData: {
    userID: '',
    userEmail: '',
    userName: '',
    userProfileImgUrl: '',
    userWalletAddr: '',
    userCreatedAt: new Date(),
    userUpdatedAt: new Date(),
  },
  feedCategories: [],
  currentLocation: {
    long: 0,
    lat: 0,
    area1: '',
    area2: '',
    area3: '',
  },
};

export const userReducer = (
  state: UserState = initialState,
  action: UserActions,
): UserState => {
  switch (action.type) {
    case USER_INIT:
      return {
        ...state,
        userData: action.userData,
        feedCategories: action.userCategories,
      };
    case USER_CHANGE_LOCATION:
      return {
        ...state,
        currentLocation: action.currentLocation,
      };
    default:
      return state;
  }
};
