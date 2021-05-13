import axios, { AxiosError } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { API_BASE_URL } from '../config';
import { Category } from '../types';
import { RootState } from './reducer';

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES' as const;
export const LOAD_CATEGORIES_SUCCESS = 'LOAD_CATEGORIES_SUCCESS' as const;
export const LOAD_CATEGORIES_ERROR = 'LOAD_CATEGORIES_ERROR' as const;

type CATEGORY_LOAD_TYPE =
  | typeof LOAD_CATEGORIES
  | typeof LOAD_CATEGORIES_SUCCESS
  | typeof LOAD_CATEGORIES_ERROR;

export type CATEGORY_ACTION_TYPE = CATEGORY_LOAD_TYPE;

export const loadCategories = () => {
  return { type: LOAD_CATEGORIES };
};

export const loadCategoriesSuccess = (data: Category[]) => {
  return { type: LOAD_CATEGORIES_SUCCESS, data };
};

export const loadCategoriesError = (error: Error | AxiosError) => {
  return { type: LOAD_CATEGORIES_ERROR, error };
};

type CategoryLoadAction =
  | ReturnType<typeof loadCategories>
  | ReturnType<typeof loadCategoriesSuccess>
  | ReturnType<typeof loadCategoriesError>;

export type CategoryAction = CategoryLoadAction;

export type CategoryState = {
  loading: boolean;
  error: Error | AxiosError | null;
  data: Category[] | null;
};

export const loadCategoriesThunk = (): ThunkAction<
  void,
  RootState,
  null,
  CategoryAction
> => {
  return async dispatch => {
    dispatch(loadCategories());
    try {
      const res = await axios.get<Category[]>(`${API_BASE_URL}/categories`);

      if (res.status === 200) {
        dispatch(loadCategoriesSuccess(res.data));
      }
    } catch (e) {
      dispatch(loadCategoriesError(e));
    }
  };
};

const initialState: CategoryState = {
  loading: false,
  error: null,
  data: null,
};

export const categoryReducer = (
  state: CategoryState = initialState,
  action: CategoryAction,
): CategoryState => {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return {
        ...state,
        loading: true,
      };
    case LOAD_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case LOAD_CATEGORIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
  }
};
