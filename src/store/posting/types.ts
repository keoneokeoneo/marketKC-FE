import { Category, LoadedImage } from '../../types';

export const POSTING_INIT = 'POSTING_INIT' as const;
export const POSTING_SAVE = 'POSTING_SAVE' as const;
export const POSTING_SELECT_CATEGORY = 'POSTING_SELECT_CATEGORY' as const;

export const POSTING_UPLOAD_POST = 'POSTING_UPLOAD_POST' as const;
export const POSTING_UPLOAD_POST_SUCCESS = 'POSTING_UPLOAD_POST_SUCCESS' as const;
export const POSTING_UPLOAD_POST_ERROR = 'POSTING_UPLOAD_POST_ERROR' as const;

export const POSTING_UPLOAD_IMAGES = 'POSTING_UPLOAD_IMAGES' as const;
export const POSTING_UPLOAD_IMAGES_SUCCESS = 'POSTING_UPLOAD_IMAGES_SUCCESS' as const;
export const POSTING_UPLOAD_IMAGES_ERROR = 'POSTING_UPLOAD_IMAGES_ERROR' as const;

type UPLOAD_POST_TYPE =
  | typeof POSTING_UPLOAD_POST
  | typeof POSTING_UPLOAD_POST_SUCCESS
  | typeof POSTING_UPLOAD_POST_ERROR;
type UPLOAD_IMAGES_TYPE =
  | typeof POSTING_UPLOAD_IMAGES
  | typeof POSTING_UPLOAD_IMAGES_SUCCESS
  | typeof POSTING_UPLOAD_IMAGES_ERROR;

export type POSTING_ACTION_TYPE =
  | typeof POSTING_INIT
  | typeof POSTING_SAVE
  | typeof POSTING_SELECT_CATEGORY
  | UPLOAD_POST_TYPE
  | UPLOAD_IMAGES_TYPE;

export type PostingState = {
  empty: boolean;
  success: boolean;
  form: {
    loading: boolean;
    error: string | null;
    data: {
      title: string;
      content: string;
      price: number;
      category: Category;
      urls: string[];
    };
  };
  images: {
    loading: boolean;
    error: string | null;
    data: LoadedImage[];
  };
};
