import { Category } from '../../types';

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES' as const;
export const LOAD_CATEGORIES_SUCCESS = 'LOAD_CATEGORIES_SUCCESS' as const;
export const LOAD_CATEGORIES_FAILURE = 'LOAD_CATEGORIES_FAILURE' as const;

type LoadCategories = {
  type: typeof LOAD_CATEGORIES;
};

type LoadCategoriesSuccess = {
  type: typeof LOAD_CATEGORIES_SUCCESS;
  categories: Category[];
};

type LoadCategoriesFailure = {
  type: typeof LOAD_CATEGORIES_FAILURE;
  code: number;
  message: string;
};

export type CategoryDispatch =
  | LoadCategories
  | LoadCategoriesSuccess
  | LoadCategoriesFailure;
