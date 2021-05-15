import { String } from 'aws-sdk/clients/apigateway';
import { FeedPost, PostRes } from '../../utils/api/post/types';

/* ---------------------- 액션 타입 ---------------------- */
export const GET_POST = 'GET_POST' as const;
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS' as const;
export const GET_POST_ERROR = 'GET_POST_ERROR' as const;

export const GET_POSTS = 'GET_POSTS' as const;
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS' as const;
export const GET_POSTS_ERROR = 'GET_POSTS_ERROR' as const;
/* ----------------------------------------------------- */

/* ---------------------- 액션 타입 유니온 ---------------------- */
type GET_POST_TYPE =
  | typeof GET_POST
  | typeof GET_POST_SUCCESS
  | typeof GET_POST_ERROR;

type GET_POSTS_TYPE =
  | typeof GET_POSTS
  | typeof GET_POSTS_SUCCESS
  | typeof GET_POSTS_ERROR;

export type POST_ACTION_TYPE = GET_POST_TYPE | GET_POSTS_TYPE;
/* ----------------------------------------------------- */
export type PostState = {
  post: {
    loading: boolean;
    data: PostRes | null;
    error: String | null;
  };
  posting: {
    loading: boolean;
    error: string | null;
    total: number;
    data: FeedPost[] | null;
  };
};
