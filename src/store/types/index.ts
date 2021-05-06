import { Category, FeedCategory } from '../../types';

export interface User {
  userID: string;
  userName: string;
  userEmail: string;
  userProfileImgUrl: string;
  userWalletAddr: string;
  userCreatedAt: string;
  userUpdatedAt: string;
}

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
    isLoggedIn: boolean;
    isValid: boolean;
    currentUserToken: string;
    currentUserID: string;
  };
};

export type PostingState = {
  formData: {
    title: string;
    content: string;
    category: Category;
  };
};

export type UserState = {
  user: User;
  feedCategoreis: FeedCategory[];
};
