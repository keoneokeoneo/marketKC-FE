import {
  GET_ETH,
  GET_POSTS,
  GET_POSTS_ERROR,
  GET_POSTS_SUCCESS,
  PostState,
} from './types';
import { PostAction } from './action';
import { GET_POST, GET_POST_ERROR, GET_POST_SUCCESS } from './types';

const initialState: PostState = {
  eth: 0,
  post: {
    loading: false,
    error: null,
    data: null,
  },
  posting: {
    loading: false,
    error: null,
    data: null,
    total: 0,
  },
};

export const postReducer = (
  state: PostState = initialState,
  action: PostAction,
): PostState => {
  switch (action.type) {
    case GET_ETH:
      return {
        ...state,
        eth: action.eth,
      };
    case GET_POST:
      return {
        ...state,
        post: {
          ...state.post,
          loading: true,
        },
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          loading: false,
          data: action.payload,
        },
      };
    case GET_POST_ERROR:
      return {
        ...state,
        post: {
          ...state.post,
          error: action.error,
          loading: false,
        },
      };
    case GET_POSTS:
      return {
        ...state,
        posting: {
          ...state.posting,
          loading: true,
        },
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posting: {
          ...state.posting,
          loading: false,
          data: action.data,
          total: action.total,
        },
      };
    case GET_POSTS_ERROR:
      return {
        ...state,
        posting: {
          ...state.posting,
          error: action.error,
          loading: false,
        },
      };
    default:
      return state;
  }
};
