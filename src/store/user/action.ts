import { socket } from '../../../App';
import { Location, User } from '../../types';
import { TradePost, TradeRequest } from '../../utils/api/user/types';
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
} from './types';

export const loadUser = () => ({
  type: LOAD_USER,
});

export const loadUserSuccess = (user: User, categories: number[]) => {
  socket.emit('login', user.id);
  return {
    type: LOAD_USER_SUCCESS,
    user,
    categories,
  };
};

export const loadUserError = (error: string) => ({
  type: LOAD_USER_ERROR,
  error,
});

export const loadUserSell = () => ({ type: LOAD_USER_SELL });
export const loadUserSellSuccess = (data: TradePost[]) => ({
  type: LOAD_USER_SELL_SUCCESS,
  data,
});
export const loadUserSellError = (error: string) => ({
  type: LOAD_USER_SELL_ERROR,
  error,
});

export const loadUserRequest = () => ({ type: LOAD_USER_REQUEST });
export const loadUserRequestSuccess = (data: TradeRequest[]) => ({
  type: LOAD_USER_REQUEST_SUCCESS,
  data,
});
export const loadUserRequestError = (error: string) => ({
  type: LOAD_USER_REQUEST_ERROR,
  error,
});

export const updateUserLocation = () => ({
  type: UPDATE_USER_LOCATION,
});

export const updateUserLocationSuccess = (location: Location) => ({
  type: UPDATE_USER_LOCATION_SUCCESS,
  location,
});

export const updateUserLocationError = (error: string) => ({
  type: UPDATE_USER_LOCATION_ERROR,
  error,
});

export const updateUserCategories = () => ({
  type: UPDATE_USER_CATEGORIES,
});

export const updateUserCategoriesSuccess = (ids: number[]) => ({
  type: UPDATE_USER_CATEGORIES_SUCCESS,
  ids,
});

export const updateUserCategoriesError = (error: string) => ({
  type: UPDATE_USER_CATEGORIES_ERROR,
  error,
});

export const updateUserWallet = () => ({
  type: UPDATE_USER_WALLET,
});

export const updateUserWalletSuccess = (walletAddr: string) => ({
  type: UPDATE_USER_WALLET_SUCCESS,
  walletAddr,
});

export const updateUserWalletError = (error: string) => ({
  type: UPDATE_USER_WALLET_ERROR,
  error,
});

type LoadUserAction =
  | ReturnType<typeof loadUser>
  | ReturnType<typeof loadUserSuccess>
  | ReturnType<typeof loadUserError>;
type LoadUserSellAction =
  | ReturnType<typeof loadUserSell>
  | ReturnType<typeof loadUserSellSuccess>
  | ReturnType<typeof loadUserSellError>;
type LoadUserRequestAction =
  | ReturnType<typeof loadUserRequest>
  | ReturnType<typeof loadUserRequestSuccess>
  | ReturnType<typeof loadUserRequestError>;
type UpdateUserLocationAction =
  | ReturnType<typeof updateUserLocation>
  | ReturnType<typeof updateUserLocationSuccess>
  | ReturnType<typeof updateUserLocationError>;
type UpdateUserCategoriesAction =
  | ReturnType<typeof updateUserCategories>
  | ReturnType<typeof updateUserCategoriesSuccess>
  | ReturnType<typeof updateUserCategoriesError>;
type UpdateUserWalletAction =
  | ReturnType<typeof updateUserWallet>
  | ReturnType<typeof updateUserWalletSuccess>
  | ReturnType<typeof updateUserWalletError>;

export type UserAction =
  | LoadUserAction
  | LoadUserSellAction
  | LoadUserRequestAction
  | UpdateUserLocationAction
  | UpdateUserCategoriesAction
  | UpdateUserWalletAction;
