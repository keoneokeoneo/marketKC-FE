import { ThunkAction } from 'redux-thunk';
import { Location, User } from '../../types';
import { userAPI } from '../../utils/api';
import { RootState } from '../reducer';
import {
  UserAction,
  loadUser,
  updateUserCategories,
  updateUserLocation,
  loadUserSuccess,
  loadUserError,
  updateUserCategoriesError,
  updateUserCategoriesSuccess,
  updateUserLocationError,
  updateUserLocationSuccess,
  updateUserWallet,
  updateUserWalletSuccess,
  updateUserWalletError,
} from './action';
import Toast from 'react-native-simple-toast';
import axios from 'axios';

export const loadUserThunk = (
  id: string,
): ThunkAction<void, RootState, null, UserAction> => {
  return async dispatch => {
    dispatch(loadUser());
    try {
      const res = await userAPI.loadUserByID(id);
      if (res.status === 200) {
        const user: User = {
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          walletAddr: res.data.walletAddr,
          profileImgUrl: res.data.profileImgUrl,
          createdAt: new Date(res.data.createdAt),
          updatedAt: new Date(res.data.updatedAt),
        };
        const categories = res.data.subscribedCategories.map(c => Number(c));

        dispatch(loadUserSuccess(user, categories));
      }
    } catch (e) {
      console.error(e);
      if (axios.isAxiosError(e) && e.response)
        dispatch(loadUserError(e.response.data));
      else dispatch(loadUserError('네트워크 에러'));
    }
  };
};

export const updateUserWalletThunk = (
  id: string,
  walletAddr: string,
): ThunkAction<void, RootState, null, UserAction> => {
  return async dispatch => {
    dispatch(updateUserWallet());
    try {
      const res = await userAPI.updateUserWalletAddr(id, walletAddr);
      if (res.status === 200) {
        dispatch(updateUserWalletSuccess(walletAddr));
      }
    } catch (e) {
      dispatch(updateUserWalletError('알수없는에러'));
    }
  };
};

export const updateUserCategoriesThunk = (
  id: string,
  categories: number[],
  flag: boolean,
): ThunkAction<void, RootState, null, UserAction> => {
  categories.sort((a, b) => a - b);
  return async dispatch => {
    dispatch(updateUserCategories());
    try {
      const res = await userAPI.updateUserCategories(id, categories);
      if (res.status === 200) {
        dispatch(updateUserCategoriesSuccess(categories));
        Toast.show(flag ? '추가되었습니다.' : '해제되었습니다.', Toast.SHORT, [
          'UIAlertController',
        ]);
      }
    } catch (e) {
      console.error(e);
      if (axios.isAxiosError(e) && e.response)
        dispatch(updateUserCategoriesError(e.response.data));
      else dispatch(updateUserCategoriesError('네트워크 에러'));
    }
  };
};

export const findCurrentLocationThunk = (
  long: number,
  lat: number,
): ThunkAction<void, RootState, null, UserAction> => {
  return async dispatch => {
    dispatch(updateUserLocation());
    try {
      const res = await userAPI.getCurrentLocation(long, lat);
      if (res.status === 200) {
        const data = res.data.results[0].region;
        const location: Location = {
          area1: data.area1.name,
          area2: data.area2.name,
          area3: data.area3.name,
          long: long,
          lat: lat,
        };
        dispatch(updateUserLocationSuccess(location));
        Toast.show(
          `현재 동네가 ${location.area3}으로 설정되었어요`,
          Toast.SHORT,
          ['UIAlertController'],
        );
      }
    } catch (e) {
      dispatch(updateUserLocationError('알수없는에러'));
    }
  };
};
