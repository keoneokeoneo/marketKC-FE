import { CategoryActions } from '../actions/categoryAction';
import {
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_FAILURE,
  LOAD_CATEGORIES_SUCCESS,
} from '../actions/categoryActionTypes';
import { CategoryState } from '../types';

const initialState: CategoryState = {
  categories: [],
  status: {
    code: 0,
    message: '',
    stage: 'INIT',
  },
};

export const categoryReducer = (
  state: CategoryState = initialState,
  action: CategoryActions,
): CategoryState => {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return {
        ...state,
        status: {
          ...state.status,
          stage: 'FETCHING',
        },
      };
    case LOAD_CATEGORIES_SUCCESS:
      return {
        categories: action.categories,
        status: {
          code: 200,
          message: '카테고리 가져오기 성공',
          stage: 'SUCCESS',
        },
      };
    case LOAD_CATEGORIES_FAILURE:
      return {
        ...state,
        status: {
          code: action.code,
          message: action.message,
          stage: 'FAILURE',
        },
      };
    default:
      return state;
  }
};
