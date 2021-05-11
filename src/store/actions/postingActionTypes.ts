import { Category, ImagePickerRes } from '../../types';

export type PostingData = {
  title: string;
  content: string;
  category: Category;
  price: number;
  imgs: ImagePickerRes[];
};

export const POSTING_INIT = 'POSTING_INIT' as const;
export const POSTING_SAVE = 'POSTING_SAVE' as const;
export const POSTING_SELECT_CATEGORY = 'POSTING_SELECT_CATEGORY' as const;

export const POSTING_UPLOAD_POST = 'POSTING_UPLOAD_POST' as const;
export const POSTING_UPLOAD_POST_SUCCESS = 'POSTING_UPLOAD_POST_SUCCESS' as const;
export const POSTING_UPLOAD_POST_FAILURE = 'POSTING_UPLOAD_POST_FAILURE' as const;

export const POSTING_UPLOAD_IMAGES = 'POSTING_UPLOAD_IMAGES' as const;
export const POSTING_UPLOAD_IMAGES_SUCCESS = 'POSTING_UPLOAD_IMAGES_SUCCESS' as const;
export const POSTING_UPLOAD_IMAGES_FAILURE = 'POSTING_UPLOAD_IMAGES_FAILURE' as const;

export type PostingInit = {
  type: typeof POSTING_INIT;
};
export type PostingSave = {
  type: typeof POSTING_SAVE;
  data: PostingData;
};
export type PostingSelectCategory = {
  type: typeof POSTING_SELECT_CATEGORY;
  category: Category;
};

export type PostingUploadPost = {
  type: typeof POSTING_UPLOAD_POST;
};
export type PostingUploadPostSuccess = {
  type: typeof POSTING_UPLOAD_POST_SUCCESS;
};
export type PostingUploadPostFailure = {
  type: typeof POSTING_UPLOAD_POST_FAILURE;
  code: number;
  message: string;
};

export type PostingUploadImages = {
  type: typeof POSTING_UPLOAD_IMAGES;
};
export type PostingUploadImagesSuccess = {
  type: typeof POSTING_UPLOAD_IMAGES_SUCCESS;
  urls: string[];
};
export type PostingUploadImagesFailure = {
  type: typeof POSTING_UPLOAD_IMAGES_FAILURE;
  code: number;
  message: string;
};

export type PositngDispatch =
  | PostingSelectCategory
  | PostingInit
  | PostingSave
  | PostingUploadPost
  | PostingUploadPostSuccess
  | PostingUploadPostFailure
  | PostingUploadImages
  | PostingUploadImagesSuccess
  | PostingUploadImagesFailure;
