import { ThunkAction } from 'redux-thunk';
import { postAPI } from '../../utils/api';
import { PostRes } from '../../utils/api/post/types';
import { RootState } from '../reducer';
import { PostAction } from './action';
import { getPost, getPostSuccess, getPostError } from './action';

export const getPostThunk = (
  id: number,
): ThunkAction<void, RootState, null, PostAction> => {
  return async dispatch => {
    dispatch(getPost());
    try {
      const res = await postAPI.getPostByID<PostRes>(id);

      if (res.status === 200) {
        dispatch(getPostSuccess(res.data));
      }
    } catch (e) {
      dispatch(getPostError(e));
    }
  };
};
