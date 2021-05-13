import { AxiosError } from 'axios';
import { PostRes } from '../../utils/api/post/types';

/* ---------------------- 액션 타입 ---------------------- */
export const GET_POST = 'GET_POST' as const;
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS' as const;
export const GET_POST_ERROR = 'GET_POST_ERROR' as const;
/* ----------------------------------------------------- */

/* ---------------------- 액션 타입 유니온 ---------------------- */
type GET_POST_TYPE =
  | typeof GET_POST
  | typeof GET_POST_SUCCESS
  | typeof GET_POST_ERROR;

export type POST_ACTION_TYPE = GET_POST_TYPE;
/* ----------------------------------------------------- */
export type PostState = {
  post: {
    loading: boolean;
    data: PostRes | null;
    error: Error | AxiosError | null;
  };
};
