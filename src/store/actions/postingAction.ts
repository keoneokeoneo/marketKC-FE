import { Dispatch } from 'react';
import {
  ACCESS_KEY_ID,
  API_BASE_URL,
  BUCKET_NAME,
  BUCKET_REGION,
  SECRET_ACCESS_KEY,
} from '../../config';
import { Category, ImagePickerRes } from '../../types';
import {
  PositngDispatch,
  PostingData,
  POSTING_INIT,
  POSTING_SAVE,
  POSTING_SELECT_CATEGORY,
  POSTING_UPLOAD_IMAGES,
  POSTING_UPLOAD_IMAGES_FAILURE,
  POSTING_UPLOAD_IMAGES_SUCCESS,
  POSTING_UPLOAD_POST,
  POSTING_UPLOAD_POST_FAILURE,
  POSTING_UPLOAD_POST_SUCCESS,
} from './postingActionTypes';
import S3 from 'aws-sdk/clients/s3';
import { v4 as uuid } from 'uuid';
import { UploadPostData, UploadPostForm } from '../types';
import { UploadPostReq } from '../../types/APITypes';
import { RootState } from '../reducers';
import axios from 'axios';

export type UploadForm = {
  title: string;
  content: string;
  price: number;
  categoryID: number;
  userID: string;
  location: string;
};

const test1 = () => async () => async () => {};

export const initPosting = () => {
  return { type: POSTING_INIT };
};

export const saveToPosting = (data: PostingData) => {
  return { type: POSTING_SAVE, data };
};

export const selectCategory = (category: Category) => {
  return { type: POSTING_SELECT_CATEGORY, category };
};

export const requestUpload = async (
  images: ImagePickerRes[],
  formData: UploadPostForm,
) => {
  await requestUploadImages(images);
  await requestUploadPost(formData);
};

export const requestUploadPost = (data: UploadPostForm) => {
  return async (
    dispatch: Dispatch<PositngDispatch>,
    getState: () => RootState,
  ) => {
    dispatch(uploadPost());
    try {
      const { area1, area2, area3 } = getState().user.location;
      const { id } = getState().user.user;
      const { urls } = getState().posting.form;
      const req: UploadPostReq = {
        ...data,
        location: `${area1} ${area2} ${area3}`,
        userID: id,
        imgUrls: urls,
      };
      console.log('upload post req', req);
      const res = await axios.post(`${API_BASE_URL}/posts`, req);
      console.log(res);

      if (res.status === 201) {
        dispatch(uploadPostSuccess());
      } else {
        dispatch(uploadPostFailure(1, 'error'));
      }
    } catch (e) {
      console.log(e);
      dispatch(uploadPostFailure(1, 'error'));
    }
  };
};

export const requestUploadImages = (imgs: ImagePickerRes[]) => {
  return (dispatch: Dispatch<PositngDispatch>, getState: () => RootState) => {
    dispatch(uploadImages());
    try {
      const client = new S3({
        credentials: {
          accessKeyId: ACCESS_KEY_ID,
          secretAccessKey: SECRET_ACCESS_KEY,
        },
        region: BUCKET_REGION,
        signatureVersion: 'v4',
      });

      const urls: string[] = [];

      imgs.forEach(async img => {
        const response = await fetch(img.path);
        const blob = await response.blob();
        const ID = uuid();

        const params = {
          Bucket: BUCKET_NAME + '/postImgs',
          Key: `${ID}.${img.path.split('.')[1]}`,
          Body: blob,
          ContentType: img.mime,
          ACL: 'public-read',
        };

        client.upload(
          params,
          (err: globalThis.Error, data: S3.ManagedUpload.SendData) => {
            if (err) {
              dispatch(uploadImagesFailure(1, err.message));
            } else {
              urls.push(data.Location);
            }
          },
        );
      });
      dispatch(uploadImagesSuccess(urls));
    } catch (e) {
      console.log(e, typeof e);
      dispatch(uploadImagesFailure(1, 'error'));
    }
  };
};

export const uploadPost = () => {
  return { type: POSTING_UPLOAD_POST };
};

export const uploadPostSuccess = () => {
  return { type: POSTING_UPLOAD_POST_SUCCESS };
};

export const uploadPostFailure = (code: number, message: string) => {
  return { type: POSTING_UPLOAD_POST_FAILURE, code, message };
};

export const uploadImages = () => {
  return { type: POSTING_UPLOAD_IMAGES };
};

export const uploadImagesSuccess = (urls: string[]) => {
  return { type: POSTING_UPLOAD_IMAGES_SUCCESS, urls };
};

export const uploadImagesFailure = (code: number, message: string) => {
  return { type: POSTING_UPLOAD_IMAGES_FAILURE, code, message };
};

export type PostingActions =
  | ReturnType<typeof selectCategory>
  | ReturnType<typeof saveToPosting>
  | ReturnType<typeof initPosting>
  | ReturnType<typeof uploadPost>
  | ReturnType<typeof uploadPostSuccess>
  | ReturnType<typeof uploadPostFailure>
  | ReturnType<typeof uploadImages>
  | ReturnType<typeof uploadImagesSuccess>
  | ReturnType<typeof uploadImagesFailure>;
