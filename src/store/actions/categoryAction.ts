import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { API_BASE_URL } from '../../config';
import { Category } from '../../types';
import {
  CategoryDispatch,
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_FAILURE,
  LOAD_CATEGORIES_SUCCESS,
} from './categoryActionTypes';

export const requestLoadCategories = () => {
  return async (dispatch: Dispatch<CategoryDispatch>) => {
    dispatch(loadCategories());

    try {
      const res: AxiosResponse<Category[]> = await axios.get(
        `${API_BASE_URL}/categories`,
      );
      dispatch(loadCategoriesSuccess(res.data));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)
        dispatch(
          loadCategoriesFailure(error.response.status, error.response.data),
        );
      else console.log(error);
    }
  };
};

export const loadCategories = () => {
  return { type: LOAD_CATEGORIES };
};

export const loadCategoriesSuccess = (categories: Category[]) => {
  return { type: LOAD_CATEGORIES_SUCCESS, categories };
};

export const loadCategoriesFailure = (code: number, message: string) => {
  return { type: LOAD_CATEGORIES_FAILURE, code, message };
};

export type CategoryActions =
  | ReturnType<typeof loadCategories>
  | ReturnType<typeof loadCategoriesSuccess>
  | ReturnType<typeof loadCategoriesFailure>;
