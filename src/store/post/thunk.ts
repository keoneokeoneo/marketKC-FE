import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { postAPI } from '../../utils/api';
import { RootState } from '../reducer';
import {
  getETH,
  getPosts,
  getPostsError,
  getPostsSuccess,
  PostAction,
} from './action';
import { getPost, getPostSuccess, getPostError } from './action';

export const getETHThunk = (): ThunkAction<
  void,
  RootState,
  null,
  PostAction
> => {
  return async dispatch => {
    try {
      const res = await postAPI.getETH();
      console.log(res);
      if (res.status === 200) {
        dispatch(getETH(res.data[0].low_price));
      }
    } catch (e) {
      console.error(e);
    }
  };
};

export const getPostThunk = (
  id: number,
): ThunkAction<void, RootState, null, PostAction> => {
  return async dispatch => {
    dispatch(getPost());
    try {
      const res = await postAPI.getPostByID(id);

      if (res.status === 200) {
        dispatch(getPostSuccess(res.data));
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response)
        dispatch(getPostError(e.response.data));
      else dispatch(getPostError('알수없는에러'));
    }
  };
};

export const getPostsThunk = (): ThunkAction<
  void,
  RootState,
  null,
  PostAction
> => {
  return async dispatch => {
    dispatch(getPosts());
    try {
      const res = await postAPI.getPosts();
      if (res.status === 200) {
        dispatch(getPostsSuccess(res.data));
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response)
        dispatch(getPostsError(e.response.data));
      else dispatch(getPostsError('알수없는에러'));
    }
  };
};
