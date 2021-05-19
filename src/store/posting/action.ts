import { Category, PostingData } from '../../types';
import {
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

export const initPosting = () => ({ type: POSTING_INIT });
export const savePosting = (data: PostingData) => ({
  type: POSTING_SAVE,
  data,
});
export const selectCategory = (category: Category) => ({
  type: POSTING_SELECT_CATEGORY,
  category,
});

export const uploadPost = () => ({ type: POSTING_UPLOAD_POST });
export const uploadPostSuccess = () => ({ type: POSTING_UPLOAD_POST_SUCCESS });
export const uploadPostError = (error: string) => ({
  type: POSTING_UPLOAD_POST_ERROR,
  error,
});

export const uploadImages = () => ({ type: POSTING_UPLOAD_IMAGES });
export const uploadImagesSuccess = (urls: string[]) => ({
  type: POSTING_UPLOAD_IMAGES_SUCCESS,
  urls,
});
export const uploadImagesError = (error: string) => ({
  type: POSTING_UPLOAD_IMAGES_ERROR,
  error,
});

type PostingUploadPostAction =
  | ReturnType<typeof uploadPost>
  | ReturnType<typeof uploadPostSuccess>
  | ReturnType<typeof uploadPostError>;

type PostingUploadImagesAction =
  | ReturnType<typeof uploadImages>
  | ReturnType<typeof uploadImagesSuccess>
  | ReturnType<typeof uploadImagesError>;

export type PostingAction =
  | ReturnType<typeof selectCategory>
  | ReturnType<typeof savePosting>
  | ReturnType<typeof initPosting>
  | PostingUploadPostAction
  | PostingUploadImagesAction;
