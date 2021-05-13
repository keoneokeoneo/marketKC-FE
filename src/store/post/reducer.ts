import { PostState } from './types';
import { PostAction } from './action';
import { GET_POST, GET_POST_ERROR, GET_POST_SUCCESS } from './types';

const initialState: PostState = {
  post: {
    loading: false,
    error: null,
    data: null,
  },
};

export const postReducer = (
  state: PostState = initialState,
  action: PostAction,
): PostState => {
  switch (action.type) {
    case GET_POST:
      return {
        post: {
          ...state.post,
          loading: true,
        },
      };
    case GET_POST_SUCCESS:
      return {
        post: {
          ...state.post,
          loading: false,
          data: action.payload,
        },
      };
    case GET_POST_ERROR:
      return {
        post: {
          ...state.post,
          error: action.error,
          loading: false,
        },
      };
    default:
      return state;
  }
};
