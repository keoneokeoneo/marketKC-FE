import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'react';
import {
  API_BASE_URL,
  NAVER_MAP_CLIENT_ID,
  NAVER_MAP_CLIENT_SECRET,
} from '../../config';
import { Category, Location, User } from '../../types';
import {
  INIT_USER,
  LOAD_USER,
  LOAD_USER_FAILURE,
  LOAD_USER_SUCCESS,
  UPDATE_USER_CATEGORIES,
  UPDATE_USER_CATEGORIES_FAILURE,
  UPDATE_USER_CATEGORIES_SUCCESS,
  UPDATE_USER_LOCATION,
  UPDATE_USER_LOCATION_FAILURE,
  UPDATE_USER_LOCATION_SUCCESS,
  UserDispatch,
} from './userActionTypes';
import { LoadUserRes } from '../../types/APITypes';

// const createGETRequest = async <Response extends any>(
//   path: string,
//   params?: Object,
// ) => {
//   try {
//     const response: AxiosResponse<Response> = await axios.get(
//       `${API_BASE_URL}/${path}`,
//     );
//     if (response.status === 404) {
//       throw ;
//     }
//     return response.data;
//   } catch (e) {
//     if (e.status === 400) {
//     }

//     if (e.status === 400) {
//     }

//     if (e.status === 403) {
//       // logout
//     }

//     const error = {
//       message: '',
//       status: e.status,
//       messageXLT: t('meesage_XLT'),
//     };

//     throw error;
//   }
// };

// const result = createGETRequest<string>('123');

export const requestLoadUser = (id: string) => {
  return async (dispatch: Dispatch<UserDispatch>) => {
    dispatch(loadUser());
    try {
      const res: AxiosResponse<LoadUserRes> = await axios.get(
        `${API_BASE_URL}/users/${id}`,
      );

      const user: User = {
        id: res.data.id,
        name: res.data.name,
        email: res.data.email,
        walletAddr: res.data.walletAddr,
        profileImgUrl: res.data.profileImgUrl,
        createdAt: new Date(res.data.createdAt),
        updatedAt: new Date(res.data.updatedAt),
      };

      const categories = res.data.subscribedCategories
        .split(',')
        .map(categoryID => parseInt(categoryID, 10));

      dispatch(loadUserSuccess(user, categories));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)
        dispatch(loadUserFailure(error.response.status, error.response.data));
      else console.log(error);
    }
  };
};

export const requestLocation = (long: number, lat: number) => {
  return async (dispatch: Dispatch<UserDispatch>) => {
    dispatch(updateUserLocation());
    try {
      const res = await axios.get(
        `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?request=coordsToaddr&coords=${long},${lat}&orders=admcode&output=json`,
        {
          headers: {
            'X-NCP-APIGW-API-KEY-ID': NAVER_MAP_CLIENT_ID,
            'X-NCP-APIGW-API-KEY': NAVER_MAP_CLIENT_SECRET,
          },
        },
      );
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
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const requestUpdateCategories = (id: string, categories: number[]) => {
  categories.sort((a, b) => a - b);
  console.log('카테고리 수정 요청', id, categories);
  return async (dispatch: Dispatch<UserDispatch>) => {
    dispatch(updateUserCategories());
    try {
      const res = await axios.patch(
        `${API_BASE_URL}/users/${id}/categories`,
        categories,
      );
      if (res.status === 200) dispatch(updateUserCategoriesSuccess(categories));
    } catch (error) {
      if (axios.isAxiosError(error)) console.log(error);
      else console.log(error);
    }
  };
};

export const initUser = () => {
  return { type: INIT_USER };
};

export const loadUser = () => {
  return { type: LOAD_USER };
};

export const loadUserSuccess = (user: User, categories: number[]) => {
  return { type: LOAD_USER_SUCCESS, user, categories };
};

export const loadUserFailure = (code: number, message: string) => {
  return { type: LOAD_USER_FAILURE, code, message };
};

export const updateUserLocation = () => {
  return { type: UPDATE_USER_LOCATION };
};

export const updateUserLocationSuccess = (location: Location) => {
  return { type: UPDATE_USER_LOCATION_SUCCESS, location };
};

export const updateUserLocationFailure = (code: number, message: string) => {
  return { type: UPDATE_USER_LOCATION_FAILURE, code, message };
};

export const updateUserCategories = () => {
  return { type: UPDATE_USER_CATEGORIES };
};

export const updateUserCategoriesSuccess = (ids: number[]) => {
  return { type: UPDATE_USER_CATEGORIES_SUCCESS, ids };
};

export const updateUserCategoriesFailure = (code: number, message: string) => {
  return { type: UPDATE_USER_CATEGORIES_FAILURE, code, message };
};

// export const requestUserInit = (userID: string) => {
//   return async (dispatch: Dispatch<UserDispatch>) => {
//     const userData: AxiosResponse<GetUserRes> = await axios.get(
//       `${API_BASE_URL}/api/user/${userID}`,
//     );

//     if (userData.status === 200) {
//       const subscribedCategories = userData.data.data.subscribedCategories.split(
//         ',',
//       );
//       const userFeedCategories = subscribedCategories.map(category => {
//         return {
//           categoryID: category.categoryID,
//           categoryName: category.categoryName,
//           isSelected: tmpCategories.some(
//             c => category.categoryID === Number(c),
//           ),
//         } as FeedCategory;
//       });

//       // 2. 유저 정보 정리
//       const user = userData.data.data;
//       const newUser: User = {
//         userID: user.userID,
//         userEmail: user.userEmail,
//         userName: user.userName,
//         userProfileImgUrl: user.userProfileImgUrl,
//         userWalletAddr: user.userWalletAddr,
//         userCreatedAt: new Date(user.createdAt),
//         userUpdatedAt: new Date(user.updatedAt),
//       };
//     }
//   };
// };

export type UserActions =
  | ReturnType<typeof initUser>
  | ReturnType<typeof loadUser>
  | ReturnType<typeof loadUserSuccess>
  | ReturnType<typeof loadUserSuccess>
  | ReturnType<typeof loadUserFailure>
  | ReturnType<typeof updateUserLocation>
  | ReturnType<typeof updateUserLocationSuccess>
  | ReturnType<typeof updateUserLocationFailure>
  | ReturnType<typeof updateUserCategories>
  | ReturnType<typeof updateUserCategoriesSuccess>
  | ReturnType<typeof updateUserCategoriesFailure>;
