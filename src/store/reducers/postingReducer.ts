import { PostingActions } from '../actions/postingAction';
import {
  POSTING_INIT,
  POSTING_SAVE,
  POSTING_SELECT_CATEGORY,
  POSTING_UPLOAD_IMAGES,
  POSTING_UPLOAD_IMAGES_FAILURE,
  POSTING_UPLOAD_IMAGES_SUCCESS,
  POSTING_UPLOAD_POST,
  POSTING_UPLOAD_POST_FAILURE,
  POSTING_UPLOAD_POST_SUCCESS,
} from '../actions/postingActionTypes';
import { PostingState } from '../types';

const initialState: PostingState = {
  status: 'Empty',
  form: {
    title: '',
    content: '',
    price: 0,
    urls: [],
    category: {
      id: 0,
      name: '카테고리를 선택하세요',
    },
    status: {
      code: 0,
      message: '',
      stage: 'INIT',
    },
  },
  files: {
    imgs: [],
    status: {
      code: 0,
      message: '',
      stage: 'INIT',
    },
  },
};

export const postingReducer = (
  state: PostingState = initialState,
  action: PostingActions,
): PostingState => {
  switch (action.type) {
    case POSTING_INIT:
      return initialState;
    case POSTING_SELECT_CATEGORY:
      return {
        ...state,
        form: {
          ...state.form,
          category: action.category,
        },
      };
    case POSTING_SAVE:
      return {
        status: 'Saved',
        form: {
          ...state.form,
          title: action.data.title,
          content: action.data.content,
          category: action.data.category,
          price: action.data.price,
          status: initialState.form.status,
        },
        files: {
          ...state.files,
          imgs: action.data.imgs,
        },
      };
    case POSTING_UPLOAD_POST:
      return {
        ...state,
        form: {
          ...state.form,
          status: {
            code: 0,
            message: '',
            stage: 'FETCHING',
          },
        },
      };
    case POSTING_UPLOAD_POST_SUCCESS:
      return {
        ...state,
        form: {
          ...state.form,
          status: {
            ...state.form.status,
            stage: 'SUCCESS',
          },
        },
      };
    case POSTING_UPLOAD_POST_FAILURE:
      return {
        ...state,
        form: {
          ...state.form,
          status: {
            code: action.code,
            message: action.message,
            stage: 'FAILURE',
          },
        },
      };
    case POSTING_UPLOAD_IMAGES:
      return {
        ...state,
        files: {
          ...state.files,
          status: {
            code: 0,
            message: '',
            stage: 'FETCHING',
          },
        },
      };
    case POSTING_UPLOAD_IMAGES_SUCCESS:
      return {
        ...state,
        form: {
          ...state.form,
          urls: action.urls,
        },
        files: {
          ...state.files,
          status: {
            code: 201,
            message: 's3 이미지 업로드 성공',
            stage: 'SUCCESS',
          },
        },
      };
    case POSTING_UPLOAD_IMAGES_FAILURE:
      return {
        ...state,
        files: {
          ...state.files,
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
