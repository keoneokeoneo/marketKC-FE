import { User, Location } from '../../types';

/* ---------------------- 액션 타입 ---------------------- */
export const LOAD_USER = ' LOAD_USER' as const;
export const LOAD_USER_SUCCESS = ' LOAD_USER_SUCCESS' as const;
export const LOAD_USER_ERROR = ' LOAD_USER_ERROR' as const;

export const UPDATE_USER_LOCATION = 'UPDATE_USER_LOCATION' as const;
export const UPDATE_USER_LOCATION_SUCCESS = 'UPDATE_USER_LOCATION_SUCCESS' as const;
export const UPDATE_USER_LOCATION_ERROR = 'UPDATE_USER_LOCATION_ERROR' as const;

export const UPDATE_USER_CATEGORIES = 'UPDATE_USER_CATEGORIES' as const;
export const UPDATE_USER_CATEGORIES_SUCCESS = 'UPDATE_USER_CATEGORIES_SUCCESS' as const;
export const UPDATE_USER_CATEGORIES_ERROR = 'UPDATE_USER_CATEGORIES_ERROR' as const;

export const UPDATE_USER_WALLET = 'UPDATE_USER_WALLET' as const;
export const UPDATE_USER_WALLET_SUCCESS = 'UPDATE_USER_WALLET_SUCCESS' as const;
export const UPDATE_USER_WALLET_ERROR = 'UPDATE_USER_WALLET_ERROR' as const;
/* ----------------------------------------------------- */

/* ---------------------- 액션 타입 유니온 ---------------------- */
type LOAD_USER_TYPE =
  | typeof LOAD_USER
  | typeof LOAD_USER_SUCCESS
  | typeof LOAD_USER_ERROR;

type UPDATE_USER_LOCATION_TYPE =
  | typeof UPDATE_USER_LOCATION
  | typeof UPDATE_USER_LOCATION_SUCCESS
  | typeof UPDATE_USER_LOCATION_ERROR;

type UPDATE_USER_CATEGORIES_TYPE =
  | typeof UPDATE_USER_CATEGORIES
  | typeof UPDATE_USER_CATEGORIES_SUCCESS
  | typeof UPDATE_USER_CATEGORIES_ERROR;

type UPDATE_USER_WALLET_TYPE =
  | typeof UPDATE_USER_WALLET
  | typeof UPDATE_USER_WALLET_SUCCESS
  | typeof UPDATE_USER_WALLET_ERROR;

export type USER_ACTION_TYPE =
  | LOAD_USER_TYPE
  | UPDATE_USER_LOCATION_TYPE
  | UPDATE_USER_CATEGORIES_TYPE
  | UPDATE_USER_WALLET_TYPE;
/* ----------------------------------------------------- */

export type UserState = {
  user: {
    loading: boolean;
    error: string | null;
    data: User;
  };
  categories: {
    loading: boolean;
    error: string | null;
    ids: number[];
  };
  location: {
    loading: boolean;
    error: string | null;
    data: Location;
  };
};
