import { AxiosError } from 'axios';
import { PostRes } from '../../utils/api/post/types';
import { GET_POST, GET_POST_ERROR, GET_POST_SUCCESS } from './types';

/* ---------------------- 액션 생성 함수 ---------------------- */
export const getPost = () => ({ type: GET_POST });
export const getPostSuccess = (post: PostRes) => ({
  type: GET_POST_SUCCESS,
  payload: post,
});
export const getPostError = (error: AxiosError) => ({
  type: GET_POST_ERROR,
  error: error,
});
/* --------------------------------------------------------- */

/* ---------------------- 액션 생성 함수 타입 ---------------------- */
type GetPostAction =
  | ReturnType<typeof getPost>
  | ReturnType<typeof getPostSuccess>
  | ReturnType<typeof getPostError>;

export type PostAction = GetPostAction;

/* ------------------------------------------------------------ */
