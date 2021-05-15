import { PostRes, PostsRes } from '../../utils/api/post/types';
import {
  GET_POST,
  GET_POSTS,
  GET_POSTS_ERROR,
  GET_POSTS_SUCCESS,
  GET_POST_ERROR,
  GET_POST_SUCCESS,
} from './types';

/* ---------------------- 액션 생성 함수 ---------------------- */
export const getPost = () => ({ type: GET_POST });
export const getPostSuccess = (post: PostRes) => ({
  type: GET_POST_SUCCESS,
  payload: post,
});
export const getPostError = (error: string) => ({
  type: GET_POST_ERROR,
  error: error,
});

export const getPosts = () => ({ type: GET_POSTS });
export const getPostsSuccess = (data: PostsRes) => ({
  type: GET_POSTS_SUCCESS,
  total: data.total,
  data: data.result,
});
export const getPostsError = (error: string) => ({
  type: GET_POSTS_ERROR,
  error: error,
});
/* --------------------------------------------------------- */

/* ---------------------- 액션 생성 함수 타입 ---------------------- */
type GetPostAction =
  | ReturnType<typeof getPost>
  | ReturnType<typeof getPostSuccess>
  | ReturnType<typeof getPostError>;

type GetPostsAction =
  | ReturnType<typeof getPosts>
  | ReturnType<typeof getPostsSuccess>
  | ReturnType<typeof getPostsError>;

export type PostAction = GetPostAction | GetPostsAction;

/* ------------------------------------------------------------ */
