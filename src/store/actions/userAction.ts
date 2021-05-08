import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'react';
import { API_BASE_URL } from '../../config';
import { Category, FeedCategory, Location } from '../../types';
import { User } from '../types';
import {
  UserDispatch,
  USER_CHANGE_LOCATION,
  USER_INIT,
} from './userActionTypes';

type GetUserRes = {
  data: {
    userID: string;
    userEmail: string;
    userName: string;
    userWalletAddr: string;
    userProfileImgUrl: string;
    createdAt: string;
    updatedAt: string;
    subscribedCategories: string;
  };
  code: number;
};

type GetAllCategoreisRes = {
  code: number;
  data: Category[];
};

export const requestUserInit = (userID: string) => {
  return async (dispatch: Dispatch<UserDispatch>) => {
    const userData: AxiosResponse<GetUserRes> = await axios.get(
      `${API_BASE_URL}/api/user/${userID}`,
    );
    const categories: AxiosResponse<GetAllCategoreisRes> = await axios.get(
      `${API_BASE_URL}/api/categories`,
    );

    if (userData.data.code === 200 && categories.data.code === 200) {
      // 모든 데이터가 제대로 들어온 상태
      // 1. 카테고리 데이터 정리
      const tmpCategories = userData.data.data.subscribedCategories.split(',');
      const userFeedCategories: FeedCategory[] = [];

      categories.data.data.forEach(category => {
        let newData: FeedCategory = {
          categoryID: category.categoryID,
          categoryName: category.categoryName,
          isSelected: false,
        };
        tmpCategories.forEach(tmp => {
          if (category.categoryID === Number(tmp)) newData.isSelected = true;
        });
        userFeedCategories.push(newData);
      });

      // 2. 유저 정보 정리
      const newUser: User = {
        userID: userData.data.data.userID,
        userEmail: userData.data.data.userEmail,
        userName: userData.data.data.userName,
        userProfileImgUrl: userData.data.data.userProfileImgUrl,
        userWalletAddr: userData.data.data.userWalletAddr,
        userCreatedAt: new Date(userData.data.data.createdAt),
        userUpdatedAt: new Date(userData.data.data.updatedAt),
      };

      dispatch(userInit(newUser, userFeedCategories));
    }
  };
};

export const userInit = (user: User, categories: FeedCategory[]) => {
  return { type: USER_INIT, userData: user, userCategories: categories };
};

export const userChangeLocation = (location: Location) => {
  return { type: USER_CHANGE_LOCATION, currentLocation: location };
};

export type UserActions = ReturnType<
  typeof userInit | typeof userChangeLocation
>;
