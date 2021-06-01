import { UserAction } from './action';
import {
  LOAD_USER,
  LOAD_USER_ERROR,
  LOAD_USER_REQUEST,
  LOAD_USER_REQUEST_ERROR,
  LOAD_USER_REQUEST_SUCCESS,
  LOAD_USER_SELL,
  LOAD_USER_SELL_ERROR,
  LOAD_USER_SELL_SUCCESS,
  LOAD_USER_SUCCESS,
  UPDATE_USER_CATEGORIES,
  UPDATE_USER_CATEGORIES_ERROR,
  UPDATE_USER_CATEGORIES_SUCCESS,
  UPDATE_USER_LOCATION,
  UPDATE_USER_LOCATION_ERROR,
  UPDATE_USER_LOCATION_SUCCESS,
  UPDATE_USER_WALLET,
  UPDATE_USER_WALLET_ERROR,
  UPDATE_USER_WALLET_SUCCESS,
  UserState,
} from './types';

const initialState: UserState = {
  user: {
    loading: false,
    error: null,
    data: {
      createdAt: new Date(),
      email: '',
      id: '',
      name: '',
      profileImgUrl: '',
      updatedAt: new Date(),
      walletAddr: '',
    },
  },
  categories: {
    loading: false,
    error: null,
    ids: [],
  },
  location: {
    loading: false,
    error: null,
    data: {
      area1: '',
      area2: '',
      area3: '',
      lat: 0,
      long: 0,
    },
  },
  sell: {
    loading: false,
    error: null,
    data: [],
  },
  request: {
    loading: false,
    error: null,
    data: [],
  },
};

export const userReducer = (
  state: UserState = initialState,
  action: UserAction,
): UserState => {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        user: {
          ...state.user,
          loading: true,
        },
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          loading: false,
          data: action.user,
        },
        categories: {
          ...state.categories,
          ids: action.categories,
        },
      };
    case LOAD_USER_ERROR:
      return {
        ...state,
        user: {
          ...state.user,
          error: action.error,
          loading: false,
        },
      };
    case LOAD_USER_SELL:
      return {
        ...state,
        sell: {
          ...state.sell,
          loading: true,
        },
      };
    case LOAD_USER_SELL_SUCCESS:
      return {
        ...state,
        sell: {
          ...state.sell,
          loading: false,
          data: action.data,
        },
      };
    case LOAD_USER_SELL_ERROR:
      return {
        ...state,
        sell: {
          ...state.sell,
          loading: false,
          error: action.error,
        },
      };
    case LOAD_USER_REQUEST:
      return {
        ...state,
        request: {
          ...state.request,
          loading: true,
        },
      };
    case LOAD_USER_REQUEST_SUCCESS:
      return {
        ...state,
        request: {
          ...state.request,
          loading: false,
          data: action.data,
        },
      };
    case LOAD_USER_REQUEST_ERROR:
      return {
        ...state,
        request: {
          ...state.request,
          loading: false,
          error: action.error,
        },
      };
    case UPDATE_USER_LOCATION:
      return {
        ...state,
        location: {
          ...state.location,
          loading: true,
        },
      };
    case UPDATE_USER_LOCATION_SUCCESS:
      return {
        ...state,
        location: {
          ...state.location,
          data: action.location,
          loading: false,
        },
      };
    case UPDATE_USER_LOCATION_ERROR:
      return {
        ...state,
        location: {
          ...state.location,
          error: action.error,
          loading: false,
        },
      };
    case UPDATE_USER_CATEGORIES:
      return {
        ...state,
        categories: {
          ...state.categories,
          loading: true,
        },
      };
    case UPDATE_USER_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: {
          ...state.categories,
          ids: action.ids,
          loading: false,
        },
      };
    case UPDATE_USER_CATEGORIES_ERROR:
      return {
        ...state,
        categories: {
          ...state.categories,
          error: action.error,
          loading: false,
        },
      };
    case UPDATE_USER_WALLET:
      return {
        ...state,
        user: {
          ...state.user,
          loading: true,
        },
      };
    case UPDATE_USER_WALLET_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          loading: false,
          data: {
            ...state.user.data,
            walletAddr: action.walletAddr,
          },
        },
      };
    case UPDATE_USER_WALLET_ERROR:
      return {
        ...state,
        user: {
          ...state.user,
          loading: false,
          error: action.error,
        },
      };
    default:
      return state;
  }
};
