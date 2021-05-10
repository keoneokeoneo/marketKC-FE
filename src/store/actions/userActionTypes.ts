import { Location, User } from '../../types';

export const INIT_USER = 'INIT_USER' as const;

export const LOAD_USER = ' LOAD_USER' as const;
export const LOAD_USER_SUCCESS = ' LOAD_USER_SUCCESS' as const;
export const LOAD_USER_FAILURE = ' LOAD_USER_FAILURE' as const;

export const UPDATE_USER_LOCATION = 'UPDATE_USER_LOCATION' as const;
export const UPDATE_USER_LOCATION_SUCCESS = 'UPDATE_USER_LOCATION_SUCCESS' as const;
export const UPDATE_USER_LOCATION_FAILURE = 'UPDATE_USER_LOCATION_FAILURE' as const;

export const UPDATE_USER_CATEGORIES = 'UPDATE_USER_CATEGORIES' as const;
export const UPDATE_USER_CATEGORIES_SUCCESS = 'UPDATE_USER_CATEGORIES_SUCCESS' as const;
export const UPDATE_USER_CATEGORIES_FAILURE = 'UPDATE_USER_CATEGORIES_FAILURE' as const;

type InitUser = {
  type: typeof INIT_USER;
};

type LoadUser = {
  type: typeof LOAD_USER;
};

type LoadUserSuccess = {
  type: typeof LOAD_USER_SUCCESS;
  user: User;
  categories: number[];
};

type LoadUserFailure = {
  type: typeof LOAD_USER_FAILURE;
  code: number;
  message: string;
};

type UpdateUserLocation = {
  type: typeof UPDATE_USER_LOCATION;
};

type UpdateUserLocationSuccess = {
  type: typeof UPDATE_USER_LOCATION_SUCCESS;
  location: Location;
};

type UpdateUserLocationFailure = {
  type: typeof UPDATE_USER_LOCATION_FAILURE;
  code: number;
  message: string;
};

type UpdateUserCategories = {
  type: typeof UPDATE_USER_CATEGORIES;
};

type UpdateUserCategoriesSuccess = {
  type: typeof UPDATE_USER_LOCATION_SUCCESS;
  ids: number[];
};

type UpdateUserCategoriesFailure = {
  type: typeof UPDATE_USER_CATEGORIES_FAILURE;
  code: number;
  message: string;
};

export type UserDispatch =
  | InitUser
  | LoadUser
  | LoadUserSuccess
  | LoadUserFailure
  | UpdateUserCategories
  | UpdateUserCategoriesSuccess
  | UpdateUserCategoriesFailure
  | UpdateUserLocation
  | UpdateUserLocationSuccess
  | UpdateUserLocationFailure;
