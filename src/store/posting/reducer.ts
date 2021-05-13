import { PostingAction } from './action';
import {
  PostingState,
  POSTING_INIT,
  POSTING_SAVE,
  POSTING_SELECT_CATEGORY,
  POSTING_UPLOAD_IMAGES,
  POSTING_UPLOAD_IMAGES_ERROR,
  POSTING_UPLOAD_IMAGES_SUCCESS,
  POSTING_UPLOAD_POST,
  POSTING_UPLOAD_POST_ERROR,
  POSTING_UPLOAD_POST_SUCCESS,
} from './types';

const initialState: PostingState = {
  empty: true,
  form: {
    loading: false,
    error: null,
    data: {
      title: '',
      content: '',
      price: 0,
      category: {
        id: 0,
        name: '카테고리를 선택하세요',
      },
      urls: [],
    },
  },
  images: {
    loading: false,
    error: null,
    data: [],
  },
};

export const postingReducer = (
  state: PostingState = initialState,
  action: PostingAction,
): PostingState => {
  switch (action.type) {
    case POSTING_INIT:
      return initialState;
    case POSTING_SAVE:
      return {
        empty: false,
        form: {
          ...state.form,
          data: {
            ...state.form.data,
            title: action.data.title,
            content: action.data.content,
            category: action.data.category,
            price: action.data.price,
          },
        },
        images: {
          ...state.images,
          data: action.data.images,
        },
      };
    case POSTING_SELECT_CATEGORY:
      return {
        ...state,
        form: {
          ...state.form,
          data: {
            ...state.form.data,
            category: action.category,
          },
        },
      };
    case POSTING_UPLOAD_IMAGES:
      return {
        ...state,
        images: {
          ...state.images,
          loading: true,
        },
      };
    case POSTING_UPLOAD_IMAGES_SUCCESS:
      return {
        ...state,
        images: {
          ...state.images,
          loading: false,
        },
        form: {
          ...state.form,
          data: {
            ...state.form.data,
            urls: action.urls,
          },
        },
      };
    case POSTING_UPLOAD_IMAGES_ERROR:
      return {
        ...state,
        images: {
          ...state.images,
          loading: false,
          error: action.error,
        },
      };
    case POSTING_UPLOAD_POST:
      return {
        ...state,
        form: {
          ...state.form,
          loading: true,
        },
      };
    case POSTING_UPLOAD_POST_SUCCESS:
      return initialState;
    case POSTING_UPLOAD_POST_ERROR:
      return {
        ...state,
        form: {
          ...state.form,
          loading: false,
          error: action.error,
        },
      };
    default:
      return state;
  }
};
