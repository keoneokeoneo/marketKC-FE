import { UserActions } from '../actions/userAction';
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
} from '../actions/userActionTypes';
import { UserState } from '../types';

const initialState: UserState = {
  user: {
    id: '',
    name: '',
    email: '',
    walletAddr: '',
    profileImgUrl: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: {
      code: 0,
      message: '',
      stage: 'INIT',
    },
  },
  categories: {
    ids: [],
    status: {
      code: 0,
      message: '',
      stage: 'INIT',
    },
  },
  location: {
    long: 0,
    lat: 0,
    area1: '',
    area2: '',
    area3: '',
    status: {
      code: 0,
      message: '',
      stage: 'INIT',
    },
  },
};

export const userReducer = (
  state: UserState = initialState,
  action: UserActions,
): UserState => {
  switch (action.type) {
    case INIT_USER:
      return initialState;
    case LOAD_USER:
      return {
        ...state,
        user: {
          ...state.user,
          status: {
            ...state.user.status,
            stage: 'FETCHING',
          },
        },
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: {
          ...action.user,
          status: {
            code: 200,
            message: '유저 정보를 성공적으로 불러왔습니다.',
            stage: 'SUCCESS',
          },
        },
        categories: {
          ...state.categories,
          ids: action.categories,
        },
      };
    case LOAD_USER_FAILURE:
      return {
        ...state,
        user: {
          ...state.user,
          status: {
            code: action.code,
            message: action.message,
            stage: 'FAILURE',
          },
        },
      };
    case UPDATE_USER_LOCATION:
      return {
        ...state,
        location: {
          ...state.location,
          status: {
            ...state.location.status,
            stage: 'FETCHING',
          },
        },
      };
    case UPDATE_USER_LOCATION_SUCCESS:
      return {
        ...state,
        location: {
          ...action.location,
          status: {
            code: 200,
            message: '위치 정보 불러오기 성공',
            stage: 'SUCCESS',
          },
        },
      };
    case UPDATE_USER_LOCATION_FAILURE:
      return {
        ...state,
        location: {
          ...state.location,
          status: {
            code: action.code,
            message: action.message,
            stage: 'FAILURE',
          },
        },
      };
    case UPDATE_USER_CATEGORIES:
      return {
        ...state,
        categories: {
          ...state.categories,
          status: {
            ...state.categories.status,
            stage: 'FETCHING',
          },
        },
      };
    case UPDATE_USER_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: {
          ids: action.ids,
          status: {
            code: 200,
            message: '관심 카테고리 설정 성공',
            stage: 'SUCCESS',
          },
        },
      };
    case UPDATE_USER_CATEGORIES_FAILURE:
      return {
        ...state,
        categories: {
          ...state.categories,
          status: {
            code: action.code,
            message: action.message,
            stage: 'FAILURE',
          },
        },
      };
    default:
      return state;
  }
};
